# Notes: Frontend Screens

**Folder:** `frontend/app/` (Expo Router)

## Purpose (bones)

Two screens prove PEMDAS end-to-end.

## Screens

| Route | File | PEMDAS node |
|-------|------|-------------|
| `/` | `index.tsx` | Boss Fight — dynamic JSON tree |
| `/pemdas` | `pemdas.tsx` | Nodes 2 & 3 — static 3-node demo |

## Boss Fight data flow

```
loadPemdasTree()
  → fixture JSON (default)
  → OR fetch API if EXPO_PUBLIC_USE_LIVE_API=true
  → initFromTree()
  → SkillTreeCanvas
```

## PEMDAS demo specifics

- 3 nodes: `demo-top`, `demo-mid`, `demo-bot`
- `demo-bot` unlocks when `demo-top` is tested (direct parent-child)
- `extraEdges` draws visual chain top→mid→bot without extra prereqs

## Layout

`_layout.tsx` — dark RPG header styling, stack navigator.
