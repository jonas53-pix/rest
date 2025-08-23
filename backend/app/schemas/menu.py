from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class CategoryBase(BaseModel):
    name: str
    description: Optional[str] = None
    slug: str

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    slug: Optional[str] = None
    is_active: Optional[bool] = None

class Category(CategoryBase):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class MenuItemBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    image_url: Optional[str] = None
    category_id: int
    calories: Optional[int] = None
    preparation_time: Optional[int] = None

class MenuItemCreate(MenuItemBase):
    pass

class MenuItemUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    image_url: Optional[str] = None
    category_id: Optional[int] = None
    is_available: Optional[bool] = None
    is_featured: Optional[bool] = None
    calories: Optional[int] = None
    preparation_time: Optional[int] = None

class MenuItem(MenuItemBase):
    id: int
    is_available: bool
    is_featured: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    category: Optional[Category] = None
    
    class Config:
        from_attributes = True

class MenuItemWithCategory(MenuItem):
    category: Category