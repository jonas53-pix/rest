from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_admin_user
from app.db.database import get_db
from app.schemas.inventory import InventoryItem, InventoryItemCreate, InventoryItemUpdate
from app.crud.inventory import (
    get_inventory_items, get_inventory_item, create_inventory_item, 
    update_inventory_item, delete_inventory_item, get_low_stock_items
)

router = APIRouter()

@router.get("/", response_model=List[InventoryItem])
async def read_inventory_items(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user = Depends(get_admin_user)
):
    return get_inventory_items(db, skip=skip, limit=limit)

@router.get("/low-stock", response_model=List[InventoryItem])
async def read_low_stock_items(
    db: Session = Depends(get_db),
    current_user = Depends(get_admin_user)
):
    return get_low_stock_items(db)

@router.post("/", response_model=InventoryItem)
async def create_new_inventory_item(
    item: InventoryItemCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_admin_user)
):
    return create_inventory_item(db, item)

@router.get("/{item_id}", response_model=InventoryItem)
async def read_inventory_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_admin_user)
):
    item = get_inventory_item(db, item_id)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inventory item not found"
        )
    return item

@router.put("/{item_id}", response_model=InventoryItem)
async def update_existing_inventory_item(
    item_id: int,
    item_update: InventoryItemUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_admin_user)
):
    item = update_inventory_item(db, item_id, item_update)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inventory item not found"
        )
    return item

@router.delete("/{item_id}")
async def delete_existing_inventory_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_admin_user)
):
    success = delete_inventory_item(db, item_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inventory item not found"
        )
    return {"message": "Inventory item deleted successfully"}