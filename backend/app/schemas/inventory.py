from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class InventoryItemBase(BaseModel):
    name: str
    sku: str
    category: str
    supplier: Optional[str] = None
    unit_cost: float
    quantity_on_hand: int = 0
    par_level: int = 0
    auto_reorder: bool = False

class InventoryItemCreate(InventoryItemBase):
    pass

class InventoryItemUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    supplier: Optional[str] = None
    unit_cost: Optional[float] = None
    quantity_on_hand: Optional[int] = None
    par_level: Optional[int] = None
    auto_reorder: Optional[bool] = None

class InventoryItem(InventoryItemBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True