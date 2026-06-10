# Skill Tree App — The Anti-Creep Engine

A project management tool that turns natural-language ideas into strict, visual, node-based progression trees. Users cannot unlock advanced features until foundational Level 1 mechanics are tested and checked off.

## Philosophy

- **No hallucination** — validated JSON only; fixtures for CI
- **Bones first** — schema → validation → lock logic → UI
- **Notes everywhere** — see [docs/NOTES/](docs/NOTES/) and per-folder `NOTES.md`
- **Commit often** — [docs/COMMIT_CADENCE.md](docs/COMMIT_CADENCE.md)

Full principles: [docs/PHILOSOPHY.md](docs/PHILOSOPHY.md)

## PEMDAS MVP Status

| Node | Name | Status |
|------|------|--------|
| 1 | AI Logic (The Brain) | Complete |
| 2 | Visual Graphing (The Canvas) | Complete |
| 3 | State Management (The Lock) | Complete |
| Boss | Tier 1 Integration | Complete |

See [docs/PEMDAS.md](docs/PEMDAS.md) for win conditions.

## Quick Start

### Backend

```bash
cd backend
py -m venv .venv
.venv\Scripts\activate        # Windows
pip install -e ".[dev]"
uvicorn app.main:app --reload
```

Generate a skill tree (requires `ANTHROPIC_API_KEY` in `.env`):

```bash
py scripts/generate_tree.py
```

### Frontend

```bash
cd frontend
npm install
npx expo start
```

- **Web:** press `w`
- **iOS:** scan QR with Expo Go

### Environment

Copy `.env.example` to `.env` at the repo root and fill in API keys.

## Architecture

- **Backend:** Python + FastAPI — LLM engine returns strictly formatted JSON
- **Frontend:** Expo (React Native + Web) + `react-native-svg` — RPG-style skill tree UI
- **Contract:** [`schemas/skill-tree.schema.json`](schemas/skill-tree.schema.json)

## API

| Endpoint | Description |
|----------|-------------|
| `GET /health` | Health check |
| `GET /trees/pemdas` | PEMDAS skill tree fixture |
| `POST /trees/generate` | Generate tree from `{ "concept": "..." }` |

## iOS / App Store Path

MVP runs on Expo Web and Expo Go. App Store submission is Phase 2 via EAS Build. See [docs/adr/001-expo-over-react-flow.md](docs/adr/001-expo-over-react-flow.md).
