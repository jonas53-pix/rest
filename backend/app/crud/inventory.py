from typing import List, Optional
from sqlalchemy.orm import Session
from app.db.models import InventoryItem
from app.schemas.inventory import InventoryItemCreate, InventoryItemUpdate

def get_inventory_item(db: Session, item_id: int) -> Optional[InventoryItem]:
    return db.query(InventoryItem).filter(InventoryItem.id == item_id).first()

def get_inventory_items(db: Session, skip: int = 0, limit: int = 100) -> List[InventoryItem]:
    return db.query(InventoryItem).offset(skip).limit(limit).all()

def get_low_stock_items(db: Session) -> List[InventoryItem]:
    """Get items where quantity_on_hand is below par_level"""
    return db.query(InventoryItem).filter(
        InventoryItem.quantity_on_hand <= InventoryItem.par_level
    ).all()

def create_inventory_item(db: Session, item: InventoryItemCreate) -> InventoryItem:
    db_item = InventoryItem(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def update_inventory_item(db: Session, item_id: int, item_update: InventoryItemUpdate) -> Optional[InventoryItem]:
    db_item = db.query(InventoryItem).filter(InventoryItem.id == item_id).first()
    if not db_item:
        return None
    
    update_data = item_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_item, field, value)
    
    db.commit()
    db.refresh(db_item)
    return db_item

def delete_inventory_item(db: Session, item_id: int) -> bool:
    db_item = db.query(InventoryItem).filter(InventoryItem.id == item_id).first()
    if not db_item:
        return False
    
    db.delete(db_item)
    db.commit()
    return True

def adjust_inventory(db: Session, item_id: int, quantity_change: int) -> Optional[InventoryItem]:
    """Adjust inventory quantity (positive for increase, negative for decrease)"""
    db_item = db.query(InventoryItem).filter(InventoryItem.id == item_id).first()
    if not db_item:
        return None
    
    new_quantity = db_item.quantity_on_hand + quantity_change
    if new_quantity < 0:
        new_quantity = 0
    
    db_item.quantity_on_hand = new_quantity
    db.commit()
    db.refresh(db_item)
    return db_item