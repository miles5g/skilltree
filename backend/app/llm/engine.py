"""
LLM orchestration — prompt, call, validate, retry.

Bones-first: no SkillTree returned without passing validate_skill_tree_json().
See docs/NOTES/backend-llm.md.
"""

import os

from app.llm.base import LLMProvider
from app.llm.claude import ClaudeProvider
from app.llm.prompts import SYSTEM_PROMPT, USER_PROMPT_TEMPLATE
from app.llm.validate import validate_skill_tree_json
from app.models.skill_tree import SkillTree

MAX_RETRIES = 3


def get_provider() -> LLMProvider:
    """Resolve LLM provider from LLM_PROVIDER env (default: claude)."""
    provider = os.getenv("LLM_PROVIDER", "claude").lower()
    if provider == "claude":
        return ClaudeProvider()
    raise ValueError(f"Unsupported LLM_PROVIDER: {provider}")


def generate_skill_tree(concept: str, provider: LLMProvider | None = None) -> SkillTree:
    """
    Generate a validated skill tree for the given concept.

    Retries up to MAX_RETRIES times, passing the real validation error to the model.
    """
    llm = provider or get_provider()
    user_prompt = USER_PROMPT_TEMPLATE.format(concept=concept)
    last_error: Exception | None = None

    for attempt in range(1, MAX_RETRIES + 1):
        retry_hint = ""
        if last_error:
            retry_hint = f"\n\nPrevious attempt failed: {last_error}. Return ONLY valid JSON."

        try:
            raw = llm.complete(SYSTEM_PROMPT, user_prompt + retry_hint)
            return validate_skill_tree_json(raw)
        except (ValueError, RuntimeError) as exc:
            last_error = exc
            if attempt == MAX_RETRIES:
                raise ValueError(f"Failed after {MAX_RETRIES} attempts: {exc}") from exc

    raise ValueError("Unexpected generation failure")
