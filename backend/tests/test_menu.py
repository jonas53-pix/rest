import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_categories():
    response = client.get("/api/v1/menu/categories")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_menu_items():
    response = client.get("/api/v1/menu/items")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_menu_item_not_found():
    response = client.get("/api/v1/menu/items/99999")
    assert response.status_code == 404