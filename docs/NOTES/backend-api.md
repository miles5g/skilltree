# Notes: Backend API

**Files:** `backend/app/main.py`, `backend/scripts/generate_tree.py`

## Purpose (bones)

Expose the skill tree data to the frontend. Read-only fixture for Boss Fight; optional live generation.

## Endpoints

| Route | Method | Source | Notes |
|-------|--------|--------|-------|
| `/health` | GET | inline | Smoke test for CI/deploy |
| `/trees/pemdas` | GET | `fixtures/pemdas-tree.json` | Always validated on read |
| `/trees/generate` | POST | LLM engine | Requires API key; returns validated JSON |

## CORS

Wide open (`*`) for PEMDAS local dev. Tighten before production.

## Environment

Loaded from repo-root `.env` via `python-dotenv`:

- `ANTHROPIC_API_KEY` — required for `/trees/generate`
- `LLM_PROVIDER` — default `claude`

## Script vs API

`generate_tree.py` hardcodes the PEMDAS concept string. Same engine as the API, but meant for CLI verification (Node 1 win condition).
