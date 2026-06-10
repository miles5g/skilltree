# Project Philosophy — The Life and Soul of Skill Tree

This document is the non-negotiable foundation for every decision in this repo.

## 1. No Hallucination

We do not guess. We do not invent APIs, file paths, or behavior that we have not verified.

| Rule | What it means in practice |
|------|---------------------------|
| **Verify before claiming** | Run the code, read the file, or check the schema before saying something works |
| **Schema is law** | LLM output must pass `schemas/skill-tree.schema.json` — no hand-wavy JSON |
| **Fixtures over live calls** | CI and Boss Fight use `fixtures/pemdas-tree.json`, not hopeful API responses |
| **Retry with evidence** | When the LLM fails validation, we pass the *actual error* back — not a vague “try again” |
| **No fake features** | If auth, billing, or NL input are not built, they are listed as out-of-scope — not implied |

Hallucination is feature creep for AI. This app exists to fight that.

## 2. Bones First

We build the skeleton before the skin.

```
Bones (must exist first)          Skin (comes later)
─────────────────────────         ────────────────────
JSON schema + fixture             Pretty animations
Lock/unlock state logic           Custom themes per user
Validated LLM pipeline            Natural-language project input
SVG node rendering                Auto-layout for 100+ nodes
pytest + tsc in CI                App Store submission
```

**PEMDAS order is bones order.** Node 1 (brain) → Node 2 (canvas) → Node 3 (lock) → Boss Fight (integration). Do not skip tiers.

## 3. Notes Everywhere

Every block, module, and non-obvious function gets documentation:

| Layer | Where notes live |
|-------|------------------|
| **Project** | `docs/PHILOSOPHY.md`, `docs/NOTES/` |
| **Module** | `NOTES.md` in each major folder (`backend/app/llm/`, `frontend/store/`, etc.) |
| **Function** | Docstrings (Python) or block comments (TypeScript) |
| **Agents** | `AGENTS.md`, `.cursor/rules/skilltree.mdc` |

When you add a file, add a note. When you add a function, add a docstring. When you change behavior, update the note.

## 4. Frequent Commits (Portfolio Cadence)

Small, honest commits beat one giant dump.

- One logical change per commit
- Message format: `type: what changed (why)`
- Push after each meaningful chunk so GitHub activity reflects real progress
- See [COMMIT_CADENCE.md](COMMIT_CADENCE.md)

## Summary

> **No hallucination. Bones first. Notes on everything. Commit often.**

That is the life and soul of this project.
