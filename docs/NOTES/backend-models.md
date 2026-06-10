# Notes: Backend Models

**File:** `backend/app/models/skill_tree.py`

## Purpose (bones)

Pydantic types that mirror `schemas/skill-tree.schema.json`. Runtime validation after JSON Schema pass.

## Types

| Model | Fields |
|-------|--------|
| `SkillNode` | id, tier, title, instruction, prerequisites, tested, x?, y? |
| `Branch` | id, name, nodes[] |
| `SkillTree` | project, branches[] |
| `GenerateRequest` | concept (optional, has PEMDAS default) |

## Helpers on `SkillTree`

- `all_nodes()` — flat list across branches
- `node_ids()` — set of IDs for prerequisite validation

## Why Pydantic after jsonschema?

- JSON Schema catches structure
- Pydantic gives typed Python objects for FastAPI `response_model`
- PEMDAS rules run on typed data (tier counts, prereq existence)
