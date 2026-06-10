"""
FastAPI entry — exposes validated skill trees to the frontend.

Bones endpoints: /health, /trees/pemdas (fixture), /trees/generate (live LLM).
See docs/NOTES/backend-api.md.
"""

from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.llm.engine import generate_skill_tree
from app.llm.validate import validate_fixture
from app.models.skill_tree import GenerateRequest, SkillTree

load_dotenv(Path(__file__).resolve().parents[2] / ".env")

REPO_ROOT = Path(__file__).resolve().parents[2]
FIXTURE_PATH = REPO_ROOT / "fixtures" / "pemdas-tree.json"

app = FastAPI(title="Skill Tree API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def load_fixture_tree() -> SkillTree:
    """Load and validate pemdas-tree.json — anti-hallucination default for Boss Fight."""
    with FIXTURE_PATH.open(encoding="utf-8") as f:
        return validate_fixture()


@app.get("/health")
def health() -> dict[str, str]:
    """Smoke check for deploy and CI."""
    return {"status": "ok"}


@app.get("/trees/pemdas", response_model=SkillTree)
def get_pemdas_tree() -> SkillTree:
    """Return golden PEMDAS fixture (no API key required)."""
    if not FIXTURE_PATH.exists():
        raise HTTPException(status_code=404, detail="PEMDAS fixture not found")
    return load_fixture_tree()


@app.post("/trees/generate", response_model=SkillTree)
def post_generate_tree(request: GenerateRequest) -> SkillTree:
    """Generate tree via LLM; returns only schema-valid JSON or 422."""
    try:
        return generate_skill_tree(request.concept)
    except (ValueError, RuntimeError) as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc
