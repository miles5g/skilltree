# AGENTS.md — Skill Tree App

Guidance for AI agents working in this repository.

## Life and soul (read first)

1. **No hallucination** — verify files, run tests, never invent behavior. See [docs/PHILOSOPHY.md](docs/PHILOSOPHY.md).
2. **Bones first** — schema, validation, lock logic before polish. PEMDAS order is mandatory.
3. **Notes everywhere** — update `docs/NOTES/`, folder `NOTES.md`, and docstrings when you change code.
4. **Commit often** — small logical commits, push frequently. See [docs/COMMIT_CADENCE.md](docs/COMMIT_CADENCE.md).

Module index: [docs/NOTES/README.md](docs/NOTES/README.md)

## PEMDAS build order (do not skip)

1. **Node 1 — AI Logic:** `backend/scripts/generate_tree.py` returns schema-valid JSON
2. **Node 2 — Visual Graphing:** `frontend/app/pemdas.tsx` renders 3 static SVG nodes + edges
3. **Node 3 — State Management:** checkbox on parent unlocks locked child
4. **Boss Fight:** `frontend/app/index.tsx` loads `fixtures/pemdas-tree.json` dynamically

## Stack

| Layer | Tech |
|-------|------|
| Backend | Python 3.11+, FastAPI, Anthropic (default LLM) |
| Frontend | Expo 56, Expo Router, react-native-svg, Zustand |
| Contract | `schemas/skill-tree.schema.json` |

## Commands

```bash
# Backend
cd backend && pip install -e ".[dev]"
uvicorn app.main:app --reload
python scripts/generate_tree.py

# Frontend
cd frontend && npm install
npx expo start

# Tests
cd backend && pytest
cd frontend && npx tsc --noEmit
```

## Environment

Copy `.env.example` to `.env` at repo root. Required for live LLM calls:

- `ANTHROPIC_API_KEY`
- `LLM_PROVIDER=claude`

Boss Fight and CI use `fixtures/pemdas-tree.json` — no API key needed.

## Anti-creep rules

- A node is **locked** if any prerequisite has `tested: false`
- Level 2+ nodes must declare Level 1 prerequisites
- Do not add auth, multi-project dashboards, or NL UI input during PEMDAS
- Keep JSON shape changes in sync: schema → Pydantic → TypeScript types

## Definition of done

| Node | Win condition |
|------|---------------|
| 1 | `generate_tree.py` prints valid JSON; `pytest` passes |
| 2 | Three circles + lines render without overlap |
| 3 | Parent checkbox unlocks greyed child + lights edge |
| Boss | Fixture JSON drives dynamic graph with same unlock behavior |
