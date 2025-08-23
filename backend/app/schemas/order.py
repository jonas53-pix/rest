from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from app.db.models import OrderStatus, OrderType, PaymentStatus

class OrderItemBase(BaseModel):
    menu_item_id: int
    quantity: int
    special_instructions: Optional[str] = None

class OrderItemCreate(OrderItemBase):
    pass

class OrderItem(OrderItemBase):
    id: int
    unit_price: float
    total_price: float
    
    class Config:
        from_attributes = True

class OrderBase(BaseModel):
    order_type: OrderType
    delivery_address: Optional[str] = None
    delivery_notes: Optional[str] = None
    table_number: Optional[str] = None

class OrderCreate(OrderBase):
    items: List[OrderItemCreate]

class OrderUpdate(BaseModel):
    status: Optional[OrderStatus] = None
    payment_status: Optional[PaymentStatus] = None
    table_number: Optional[str] = None
    estimated_ready_time: Optional[datetime] = None

class Order(OrderBase):
    id: int
    order_number: str
    customer_id: int
    status: OrderStatus
    payment_status: PaymentStatus
    subtotal: float
    tax_amount: float
    service_charge: float
    total_amount: float
    estimated_ready_time: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    order_items: List[OrderItem] = []
    
    class Config:
        from_attributes = True