"""
Anthropic Claude provider — default LLM for Node 1.

Requires ANTHROPIC_API_KEY. Model override via ANTHROPIC_MODEL env.
See docs/NOTES/backend-llm.md.
"""

import os

import anthropic

from app.llm.base import LLMProvider


class ClaudeProvider(LLMProvider):
    """Calls Claude Messages API; extracts text blocks only."""

    def __init__(self) -> None:
        api_key = os.getenv("ANTHROPIC_API_KEY")
        if not api_key:
            raise RuntimeError("ANTHROPIC_API_KEY is not set")
        self.client = anthropic.Anthropic(api_key=api_key)
        self.model = os.getenv("ANTHROPIC_MODEL", "claude-sonnet-4-20250514")

    def complete(self, system: str, user: str) -> str:
        """Send system+user prompts; return concatenated text response."""
        message = self.client.messages.create(
            model=self.model,
            max_tokens=4096,
            system=system,
            messages=[{"role": "user", "content": user}],
        )
        parts = [block.text for block in message.content if block.type == "text"]
        if not parts:
            raise RuntimeError("Claude returned no text content")
        return "\n".join(parts)
