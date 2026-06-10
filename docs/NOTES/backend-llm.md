# Notes: Backend LLM Engine

**Folder:** `backend/app/llm/`

## Purpose (bones)

Turn a project concept string into a **validated** `SkillTree` object. This is Node 1 — the brain.

## File map

| File | Role |
|------|------|
| `base.py` | `LLMProvider` ABC — swap Claude/OpenAI without touching callers |
| `claude.py` | Default provider; reads `ANTHROPIC_API_KEY` |
| `prompts.py` | Strict system prompt — demands raw JSON only |
| `validate.py` | Parse, schema-check, PEMDAS-check; strip markdown fences |
| `engine.py` | Orchestration: prompt → LLM → validate → retry (max 3) |

## No-hallucination pipeline

```
concept string
    → SYSTEM_PROMPT + USER_PROMPT
    → llm.complete()
    → extract_json_block()      # strip ``` fences if model disobeys
    → json.loads()
    → Draft7Validator(schema)
    → validate_pemdas_rules()
    → SkillTree (Pydantic)
```

If any step fails, the **actual error message** is fed into the next retry.

## What we deliberately do NOT do yet

- Stream tokens to the UI
- Cache LLM responses in a database
- Accept malformed JSON “close enough”

## Entry points

- CLI: `backend/scripts/generate_tree.py`
- HTTP: `POST /trees/generate` in `main.py`
