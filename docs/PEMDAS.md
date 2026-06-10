# PEMDAS Skill Tree — Win Conditions

Build the Skill Tree App itself using this strict progression.

## Node 1: AI Logic (The Brain)

- [x] `backend/scripts/generate_tree.py` hardcodes concept: "Build the Skill Tree App (Anti-Creep Engine)"
- [x] LLM returns **only** JSON matching `schemas/skill-tree.schema.json`
- [x] Output contains exactly **3 Level-1** nodes and **1 Level-2** node (PEMDAS validation)
- [x] Script exits 0 on success, non-zero on failure
- [x] `pytest` validates fixture and sample trees

**Win:** Parseable, schema-valid JSON printed to stdout.

## Node 2: Visual Graphing (The Canvas)

- [x] `frontend/components/SkillTreeCanvas.tsx` renders 3 static SVG circles
- [x] Connection lines drawn between nodes
- [x] Layout clean on web and iOS (Expo Go)
- [x] Demo screen at `frontend/app/pemdas.tsx`

**Win:** Nodes and edges render cleanly on screen.

## Node 3: State Management (The Lock)

- [x] Bottom node greyed out, not interactive
- [x] Top node has vibrant styling + "Tested & Working" checkbox
- [x] Checking parent unlocks child (color + clickable)
- [x] Edge lights up via `UnlockEdge.tsx`

**Win:** Parent checkbox visually activates child node.

## Boss Fight: Tier 1 Integration

- [x] `fixtures/pemdas-tree.json` drives the graph on `frontend/app/index.tsx`
- [x] `GET /trees/pemdas` serves the same fixture from FastAPI
- [x] Generic `isUnlocked()` from prerequisite `tested` flags
- [x] Optional: `EXPO_PUBLIC_USE_LIVE_API=true` fetches from backend

**Win:** Hardcoded JSON → dynamic parent + locked child; parent unlocks child.
