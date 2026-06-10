# Bones Checklist — What Must Exist Before Polish

Use this before adding any new feature. If the bone is missing, build it first.

## Data bones

- [x] `schemas/skill-tree.schema.json`
- [x] `fixtures/pemdas-tree.json` (validated, CI-safe)
- [x] Pydantic models (`backend/app/models/`)
- [x] TypeScript types (`frontend/types/`)

## Brain bones (Node 1)

- [x] Strict LLM prompts (`prompts.py`)
- [x] JSON extraction + schema validation (`validate.py`)
- [x] PEMDAS tier rules (3× L1, 1× L2)
- [x] Retry with real error feedback (`engine.py`)
- [x] CLI script (`generate_tree.py`)

## Canvas bones (Node 2)

- [x] SVG nodes + edges (`SkillTreeCanvas`, `UnlockEdge`)
- [x] Layout from JSON coordinates (`utils/layout.ts`)

## Lock bones (Node 3)

- [x] `isUnlocked()` from prerequisite `tested` flags
- [x] Greyed locked nodes, no pointer events
- [x] "Tested & Working" checkbox
- [x] Edge lights when prerequisite tested

## Integration bones (Boss Fight)

- [x] Fixture-driven dynamic render (`app/index.tsx`)
- [x] `GET /trees/pemdas` API
- [x] pytest + tsc in CI

## Not bones yet (do not pretend these exist)

- [ ] User accounts
- [ ] Natural language input from UI
- [ ] Server-side progress sync
- [ ] Auto-layout for large trees
- [ ] App Store build
