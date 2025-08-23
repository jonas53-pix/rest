from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_active_user, get_admin_user
from app.db.database import get_db
from app.schemas.order import Order, OrderCreate, OrderUpdate
from app.crud.order import (
    get_orders, get_order, create_order, update_order, delete_order,
    get_user_orders
)

router = APIRouter()

@router.get("/", response_model=List[Order])
async def read_orders(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user = Depends(get_admin_user)
):
    return get_orders(db, skip=skip, limit=limit)

@router.post("/", response_model=Order)
async def create_new_order(
    order: OrderCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    return create_order(db, order, current_user.id)

@router.get("/my-orders", response_model=List[Order])
async def read_my_orders(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    return get_user_orders(db, current_user.id, skip=skip, limit=limit)

@router.get("/{order_id}", response_model=Order)
async def read_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    order = get_order(db, order_id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    # Check if user owns the order or is admin
    if order.customer_id != current_user.id and current_user.role not in ["admin", "manager"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    return order

@router.put("/{order_id}", response_model=Order)
async def update_existing_order(
    order_id: int,
    order_update: OrderUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_admin_user)
):
    order = update_order(db, order_id, order_update)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    return order

@router.delete("/{order_id}")
async def delete_existing_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_admin_user)
):
    success = delete_order(db, order_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    return {"message": "Order deleted successfully"}