# Notes: Frontend Store

**File:** `frontend/store/useSkillTreeStore.ts`

## Purpose (bones)

Single source of truth for **which nodes are tested** and **which are unlocked**. Node 3 — the lock.

## State shape

```ts
{
  project: string;
  nodes: Record<string, SkillNode>;  // keyed by node.id
}
```

## Core functions

| Function | Behavior |
|----------|----------|
| `initFromTree(tree)` | Flatten branches into `nodes` map |
| `setTested(id, bool)` | Toggle checkbox; triggers unlock recompute |
| `isUnlocked(id)` | true if no prereqs OR all prereqs have `tested: true` |
| `isEdgeLit(from, to)` | true if `to` lists `from` as prereq AND `from` is tested |

## Persistence

Zustand `persist` + AsyncStorage. MVP only — no server sync.

## Anti-creep invariant

**Never** set a child `tested: true` automatically when parent is tested. User must explicitly check each node.

Unlock ≠ tested. A node can be unlocked (visible, clickable) but not yet marked tested.
