#!/usr/bin/env python3
"""Node 1: Generate a PEMDAS skill tree from a hardcoded concept via LLM."""

import json
import sys
from pathlib import Path

from dotenv import load_dotenv

REPO_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(REPO_ROOT / "backend"))

load_dotenv(REPO_ROOT / ".env")

from app.llm.engine import generate_skill_tree  # noqa: E402

PEMDAS_CONCEPT = "Build the Skill Tree App (Anti-Creep Engine)"


def main() -> int:
    try:
        tree = generate_skill_tree(PEMDAS_CONCEPT)
        print(json.dumps(tree.model_dump(), indent=2))
        return 0
    except (ValueError, RuntimeError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
