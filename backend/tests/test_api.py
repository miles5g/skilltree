from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_get_pemdas_tree():
    response = client.get("/trees/pemdas")
    assert response.status_code == 200
    data = response.json()
    assert data["project"]
    assert len(data["branches"]) >= 1
    nodes = [n for b in data["branches"] for n in b["nodes"]]
    tier1 = [n for n in nodes if n["tier"] == 1]
    tier2 = [n for n in nodes if n["tier"] == 2]
    assert len(tier1) == 3
    assert len(tier2) == 1
