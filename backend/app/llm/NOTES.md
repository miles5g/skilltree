# LLM Module — Quick Notes

> Full doc: `docs/NOTES/backend-llm.md`

**Bones:** concept → validated `SkillTree`. No trust without `validate_skill_tree_json()`.

| File | One-liner |
|------|-----------|
| `base.py` | Provider interface |
| `claude.py` | Anthropic API call |
| `prompts.py` | "JSON only" system prompt |
| `validate.py` | Schema + PEMDAS rules |
| `engine.py` | Retry loop (max 3) |
