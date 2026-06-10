"""LLM provider interface — swap implementations without touching engine.py."""

from abc import ABC, abstractmethod


class LLMProvider(ABC):
    """Abstract base for text completion (Claude, OpenAI, etc.)."""

    @abstractmethod
    def complete(self, system: str, user: str) -> str:
        """Return raw text from the model (expected: JSON only)."""
        raise NotImplementedError
