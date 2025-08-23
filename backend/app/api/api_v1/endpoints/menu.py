from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_active_user, get_admin_user
from app.db.database import get_db
from app.schemas.menu import Category, CategoryCreate, CategoryUpdate, MenuItem, MenuItemCreate, MenuItemUpdate
from app.crud.menu import (
    get_categories, get_category, create_category, update_category, delete_category,
    get_menu_items, get_menu_item, create_menu_item, update_menu_item, delete_menu_item,
    get_menu_items_by_category
)

router = APIRouter()

# Categories
@router.get("/categories", response_model=List[Category])
async def read_categories(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    return get_categories(db, skip=skip, limit=limit)

@router.post("/categories", response_model=Category)
async def create_new_category(
    category: CategoryCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_admin_user)
):
    return create_category(db, category)

@router.get("/categories/{category_id}", response_model=Category)
async def read_category(
    category_id: int,
    db: Session = Depends(get_db)
):
    category = get_category(db, category_id)
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )
    return category

@router.put("/categories/{category_id}", response_model=Category)
async def update_existing_category(
    category_id: int,
    category_update: CategoryUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_admin_user)
):
    category = update_category(db, category_id, category_update)
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )
    return category

@router.delete("/categories/{category_id}")
async def delete_existing_category(
    category_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_admin_user)
):
    success = delete_category(db, category_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )
    return {"message": "Category deleted successfully"}

# Menu Items
@router.get("/items", response_model=List[MenuItem])
async def read_menu_items(
    skip: int = 0,
    limit: int = 100,
    category_id: int = None,
    available_only: bool = True,
    db: Session = Depends(get_db)
):
    if category_id:
        return get_menu_items_by_category(db, category_id, available_only=available_only)
    return get_menu_items(db, skip=skip, limit=limit, available_only=available_only)

@router.post("/items", response_model=MenuItem)
async def create_new_menu_item(
    menu_item: MenuItemCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_admin_user)
):
    return create_menu_item(db, menu_item)

@router.get("/items/{item_id}", response_model=MenuItem)
async def read_menu_item(
    item_id: int,
    db: Session = Depends(get_db)
):
    item = get_menu_item(db, item_id)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Menu item not found"
        )
    return item

@router.put("/items/{item_id}", response_model=MenuItem)
async def update_existing_menu_item(
    item_id: int,
    item_update: MenuItemUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_admin_user)
):
    item = update_menu_item(db, item_id, item_update)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Menu item not found"
        )
    return item

@router.delete("/items/{item_id}")
async def delete_existing_menu_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_admin_user)
):
    success = delete_menu_item(db, item_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Menu item not found"
        )
    return {"message": "Menu item deleted successfully"}