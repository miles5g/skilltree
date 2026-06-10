# Commit Cadence — Portfolio-Friendly Workflow

## Why frequent commits?

This repo doubles as a **portfolio artifact**. Small, real commits show:

- Consistent engineering habit
- Clear thinking in progress
- Honest history (not one AI-generated blob)

## Rules

1. **Commit after each logical unit** — one module, one doc pass, one test fix
2. **Push soon after commit** — keep `main` on GitHub current
3. **Never commit secrets** — `.env` stays gitignored
4. **Never empty or WIP commits** — each commit should pass tests or add docs that stand alone

## Message format

```
type: short summary

Optional one-line why.
```

| Type | Use for |
|------|---------|
| `docs` | NOTES.md, PHILOSOPHY, docstrings, README |
| `feat` | New behavior that works |
| `fix` | Bug fix |
| `test` | Tests only |
| `chore` | Tooling, CI, gitignore |
| `refactor` | Same behavior, cleaner code |

## Example sequence (PEMDAS-style)

```
docs: add project philosophy and anti-hallucination rules
docs: add backend LLM module NOTES
feat: add schema validator with PEMDAS tier checks
feat: add SkillTreeCanvas SVG renderer
feat: add Zustand lock/unlock store
test: add fixture validation pytest
chore: add GitHub Actions CI workflow
```

## Push command

```bash
git push origin main
```

If the remote is not set up yet:

```bash
gh repo create skilltree --public --source=. --remote=origin --push
```
