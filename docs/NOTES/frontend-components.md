# Notes: Frontend Components

**Folder:** `frontend/components/`

## Purpose (bones)

Render the RPG skill tree visually. Node 2 (canvas) + Node 3 (lock styling).

## Component map

| Component | Responsibility |
|-----------|----------------|
| `SkillTreeCanvas` | SVG container; draws edges then nodes; wires store |
| `SkillNode` | Circle + tier label + lock icon; SVG layer |
| `SkillNodeCheckbox` | RN overlay for accessible "Tested & Working" |
| `UnlockEdge` | Line between nodes; dim vs lit color |
| `InstructionModal` | Shows `instruction` prompt when node tapped |

## Render order (important)

1. Edges (behind nodes)
2. SVG nodes
3. Checkbox overlays (absolute positioned on top)
4. Modal (portal)

## Locked node rules

- `opacity: 0.45`
- `pointerEvents: 'none'` on SVG circle
- Lock emoji overlay

## Visual tokens

All colors from `frontend/theme/tokens.ts` — do not hardcode hex in new components.
