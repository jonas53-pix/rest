from typing import List, Optional
from sqlalchemy.orm import Session
from app.db.models import Category, MenuItem
from app.schemas.menu import CategoryCreate, CategoryUpdate, MenuItemCreate, MenuItemUpdate

# Category CRUD operations
def get_category(db: Session, category_id: int) -> Optional[Category]:
    return db.query(Category).filter(Category.id == category_id).first()

def get_categories(db: Session, skip: int = 0, limit: int = 100) -> List[Category]:
    return db.query(Category).filter(Category.is_active == True).offset(skip).limit(limit).all()

def create_category(db: Session, category: CategoryCreate) -> Category:
    db_category = Category(**category.dict())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

def update_category(db: Session, category_id: int, category_update: CategoryUpdate) -> Optional[Category]:
    db_category = db.query(Category).filter(Category.id == category_id).first()
    if not db_category:
        return None
    
    update_data = category_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_category, field, value)
    
    db.commit()
    db.refresh(db_category)
    return db_category

def delete_category(db: Session, category_id: int) -> bool:
    db_category = db.query(Category).filter(Category.id == category_id).first()
    if not db_category:
        return False
    
    db.delete(db_category)
    db.commit()
    return True

# MenuItem CRUD operations
def get_menu_item(db: Session, item_id: int) -> Optional[MenuItem]:
    return db.query(MenuItem).filter(MenuItem.id == item_id).first()

def get_menu_items(db: Session, skip: int = 0, limit: int = 100, available_only: bool = True) -> List[MenuItem]:
    query = db.query(MenuItem)
    if available_only:
        query = query.filter(MenuItem.is_available == True)
    return query.offset(skip).limit(limit).all()

def get_menu_items_by_category(db: Session, category_id: int, available_only: bool = True) -> List[MenuItem]:
    query = db.query(MenuItem).filter(MenuItem.category_id == category_id)
    if available_only:
        query = query.filter(MenuItem.is_available == True)
    return query.all()

def create_menu_item(db: Session, menu_item: MenuItemCreate) -> MenuItem:
    db_item = MenuItem(**menu_item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def update_menu_item(db: Session, item_id: int, item_update: MenuItemUpdate) -> Optional[MenuItem]:
    db_item = db.query(MenuItem).filter(MenuItem.id == item_id).first()
    if not db_item:
        return None
    
    update_data = item_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_item, field, value)
    
    db.commit()
    db.refresh(db_item)
    return db_item

def delete_menu_item(db: Session, item_id: int) -> bool:
    db_item = db.query(MenuItem).filter(MenuItem.id == item_id).first()
    if not db_item:
        return False
    
    db.delete(db_item)
    db.commit()
    return True