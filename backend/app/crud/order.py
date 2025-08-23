from typing import List, Optional
from sqlalchemy.orm import Session
from app.db.models import Order, OrderItem, MenuItem
from app.schemas.order import OrderCreate, OrderUpdate
import uuid
from datetime import datetime

def generate_order_number() -> str:
    """Generate a unique order number"""
    return f"ORD-{uuid.uuid4().hex[:8].upper()}"

def get_order(db: Session, order_id: int) -> Optional[Order]:
    return db.query(Order).filter(Order.id == order_id).first()

def get_orders(db: Session, skip: int = 0, limit: int = 100) -> List[Order]:
    return db.query(Order).order_by(Order.created_at.desc()).offset(skip).limit(limit).all()

def get_user_orders(db: Session, user_id: int, skip: int = 0, limit: int = 100) -> List[Order]:
    return db.query(Order).filter(Order.customer_id == user_id).order_by(Order.created_at.desc()).offset(skip).limit(limit).all()

def create_order(db: Session, order: OrderCreate, customer_id: int) -> Order:
    # Calculate totals
    subtotal = 0
    order_items_data = []
    
    for item_data in order.items:
        menu_item = db.query(MenuItem).filter(MenuItem.id == item_data.menu_item_id).first()
        if not menu_item or not menu_item.is_available:
            continue
        
        item_total = menu_item.price * item_data.quantity
        subtotal += item_total
        
        order_items_data.append({
            "menu_item_id": item_data.menu_item_id,
            "quantity": item_data.quantity,
            "unit_price": menu_item.price,
            "total_price": item_total,
            "special_instructions": item_data.special_instructions
        })
    
    # Calculate tax and service charge (you can make these configurable)
    tax_rate = 0.08  # 8% tax
    service_charge_rate = 0.10  # 10% service charge
    
    tax_amount = subtotal * tax_rate
    service_charge = subtotal * service_charge_rate
    total_amount = subtotal + tax_amount + service_charge
    
    # Create order
    db_order = Order(
        order_number=generate_order_number(),
        customer_id=customer_id,
        order_type=order.order_type,
        subtotal=subtotal,
        tax_amount=tax_amount,
        service_charge=service_charge,
        total_amount=total_amount,
        delivery_address=order.delivery_address,
        delivery_notes=order.delivery_notes,
        table_number=order.table_number
    )
    
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    
    # Create order items
    for item_data in order_items_data:
        db_order_item = OrderItem(
            order_id=db_order.id,
            **item_data
        )
        db.add(db_order_item)
    
    db.commit()
    db.refresh(db_order)
    return db_order

def update_order(db: Session, order_id: int, order_update: OrderUpdate) -> Optional[Order]:
    db_order = db.query(Order).filter(Order.id == order_id).first()
    if not db_order:
        return None
    
    update_data = order_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_order, field, value)
    
    db.commit()
    db.refresh(db_order)
    return db_order

def delete_order(db: Session, order_id: int) -> bool:
    db_order = db.query(Order).filter(Order.id == order_id).first()
    if not db_order:
        return False
    
    # Delete order items first
    db.query(OrderItem).filter(OrderItem.order_id == order_id).delete()
    
    # Delete order
    db.delete(db_order)
    db.commit()
    return True