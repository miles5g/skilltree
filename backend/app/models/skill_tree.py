"""
Pydantic models mirroring schemas/skill-tree.schema.json.

These are the typed bones passed between LLM, API, and (via JSON) the frontend.
See docs/NOTES/backend-models.md.
"""

from pydantic import BaseModel, Field


class SkillNode(BaseModel):
    """One task node in the skill tree."""

    id: str
    tier: int = Field(ge=1)
    title: str
    instruction: str
    prerequisites: list[str] = Field(default_factory=list)
    tested: bool = False
    x: float | None = None
    y: float | None = None


class Branch(BaseModel):
    """Logical grouping (e.g. AI Logic, UI)."""

    id: str
    name: str
    nodes: list[SkillNode]


class SkillTree(BaseModel):
    """Root object — project name + branches."""

    project: str
    branches: list[Branch]

    def all_nodes(self) -> list[SkillNode]:
        """Flatten nodes across branches for validation and counting."""
        return [node for branch in self.branches for node in branch.nodes]

    def node_ids(self) -> set[str]:
        """All node IDs — used to verify prerequisites exist."""
        return {node.id for node in self.all_nodes()}


class GenerateRequest(BaseModel):
    """POST body for /trees/generate."""

    concept: str = "Build the Skill Tree App (Anti-Creep Engine)"
