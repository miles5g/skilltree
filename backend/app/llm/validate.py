"""
Validation layer — the anti-hallucination gate.

Every LLM response passes through here before the app trusts it.
See docs/NOTES/backend-llm.md and backend/app/llm/NOTES.md.
"""

import json
from pathlib import Path

import jsonschema
from jsonschema import Draft7Validator

from app.models.skill_tree import SkillTree

REPO_ROOT = Path(__file__).resolve().parents[3]
SCHEMA_PATH = REPO_ROOT / "schemas" / "skill-tree.schema.json"


def load_schema() -> dict:
    """Load skill-tree.schema.json from repo root (single source of truth)."""
    with SCHEMA_PATH.open(encoding="utf-8") as f:
        return json.load(f)


def extract_json_block(text: str) -> str:
    """Strip markdown fences and surrounding whitespace from LLM output."""
    cleaned = text.strip()
    if cleaned.startswith("```"):
        lines = cleaned.splitlines()
        if lines[0].startswith("```"):
            lines = lines[1:]
        if lines and lines[-1].strip() == "```":
            lines = lines[:-1]
        cleaned = "\n".join(lines).strip()
    return cleaned


def validate_pemdas_rules(tree: SkillTree) -> list[str]:
    """
    Enforce PEMDAS bone structure beyond JSON Schema.

    - Exactly 3 tier-1 nodes, 1 tier-2 node
    - Tier 2+ must declare prerequisites that exist in the tree
    """
    errors: list[str] = []
    nodes = tree.all_nodes()
    tier1 = [n for n in nodes if n.tier == 1]
    tier2 = [n for n in nodes if n.tier == 2]

    if len(tier1) != 3:
        errors.append(f"Expected exactly 3 tier-1 nodes, got {len(tier1)}")
    if len(tier2) != 1:
        errors.append(f"Expected exactly 1 tier-2 node, got {len(tier2)}")

    known_ids = tree.node_ids()
    for node in nodes:
        for prereq in node.prerequisites:
            if prereq not in known_ids:
                errors.append(f"Node '{node.id}' references unknown prerequisite '{prereq}'")
        if node.tier >= 2 and not node.prerequisites:
            errors.append(f"Tier {node.tier} node '{node.id}' must have prerequisites")

    return errors


def validate_skill_tree_json(raw: str) -> SkillTree:
    """
    Full pipeline: strip fences → parse JSON → schema → PEMDAS → Pydantic.

    Raises ValueError with specific reason on any failure (fed back to LLM on retry).
    """
    cleaned = extract_json_block(raw)
    try:
        data = json.loads(cleaned)
    except json.JSONDecodeError as exc:
        raise ValueError(f"Invalid JSON: {exc}") from exc

    schema = load_schema()
    validator = Draft7Validator(schema)
    schema_errors = sorted(validator.iter_errors(data), key=lambda e: e.path)
    if schema_errors:
        messages = "; ".join(e.message for e in schema_errors)
        raise ValueError(f"Schema validation failed: {messages}")

    tree = SkillTree.model_validate(data)
    pemdas_errors = validate_pemdas_rules(tree)
    if pemdas_errors:
        raise ValueError("PEMDAS rules failed: " + "; ".join(pemdas_errors))

    return tree


def validate_fixture(path: Path | None = None) -> SkillTree:
    """Validate pemdas-tree.json — used by API, tests, and CI (no API key)."""
    fixture_path = path or (REPO_ROOT / "fixtures" / "pemdas-tree.json")
    with fixture_path.open(encoding="utf-8") as f:
        return validate_skill_tree_json(f.read())
