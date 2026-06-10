# Notes: Schema Contract

**Files:** `schemas/skill-tree.schema.json`, `fixtures/pemdas-tree.json`, `frontend/data/pemdas-tree.json`

## Purpose (bones)

The schema is the **single source of truth** between LLM, API, and UI. No component may invent fields.

## Shape

```
SkillTree
├── project: string
└── branches[]
    ├── id, name
    └── nodes[]
        ├── id, tier, title, instruction
        ├── prerequisites: string[]
        ├── tested: boolean
        └── x?, y?  (optional layout hints)
```

## PEMDAS validation (beyond JSON Schema)

`validate_pemdas_rules()` enforces:

- Exactly **3** nodes with `tier === 1`
- Exactly **1** node with `tier === 2`
- Tier 2+ nodes must have non-empty `prerequisites`
- All prerequisite IDs must exist in the tree

## Anti-hallucination

- LLM output is **never trusted** until `validate_skill_tree_json()` passes
- Boss Fight defaults to **fixture file**, not live generation
- CI validates fixture without API keys

## Sync checklist

When changing the schema:

1. Update `schemas/skill-tree.schema.json`
2. Update `backend/app/models/skill_tree.py` (Pydantic)
3. Update `frontend/types/skillTree.ts`
4. Update `fixtures/pemdas-tree.json`
5. Run `pytest` and `npm run typecheck`
