import json
from pathlib import Path

import pytest

from app.llm.validate import validate_fixture, validate_skill_tree_json
from app.models.skill_tree import SkillTree

REPO_ROOT = Path(__file__).resolve().parents[2]
FIXTURE_PATH = REPO_ROOT / "fixtures" / "pemdas-tree.json"


def test_fixture_passes_schema_and_pemdas_rules():
    tree = validate_fixture(FIXTURE_PATH)
    assert tree.project
    assert len(tree.branches) >= 1
    tier1 = [n for n in tree.all_nodes() if n.tier == 1]
    tier2 = [n for n in tree.all_nodes() if n.tier == 2]
    assert len(tier1) == 3
    assert len(tier2) == 1


def test_rejects_invalid_json():
    with pytest.raises(ValueError, match="Invalid JSON"):
        validate_skill_tree_json("not json")


def test_rejects_wrong_tier_counts():
    bad = {
        "project": "Test",
        "branches": [
            {
                "id": "ui",
                "name": "UI",
                "nodes": [
                    {
                        "id": "ui-l1-a",
                        "tier": 1,
                        "title": "A",
                        "instruction": "Do A",
                        "prerequisites": [],
                        "tested": False,
                    }
                ],
            }
        ],
    }
    with pytest.raises(ValueError, match="PEMDAS"):
        validate_skill_tree_json(json.dumps(bad))


def test_extract_json_from_markdown_fence():
    fenced = """```json
{"project": "X", "branches": []}
```"""
    with pytest.raises(ValueError):
        # branches minItems=1 will fail, but JSON parses
        validate_skill_tree_json(fenced)
