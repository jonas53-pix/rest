from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta

from app.api.deps import get_admin_user
from app.db.database import get_db
from app.db.models import Order, Reservation, User, MenuItem, OrderStatus, ReservationStatus
from app.schemas.user import User as UserSchema

router = APIRouter()

@router.get("/dashboard")
async def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_user = Depends(get_admin_user)
):
    """Get dashboard statistics for admin panel"""
    today = datetime.now().date()
    week_ago = today - timedelta(days=7)
    
    # Order statistics
    total_orders = db.query(Order).count()
    today_orders = db.query(Order).filter(
        func.date(Order.created_at) == today
    ).count()
    
    pending_orders = db.query(Order).filter(
        Order.status.in_([OrderStatus.PENDING, OrderStatus.CONFIRMED, OrderStatus.PREPARING])
    ).count()
    
    # Revenue statistics
    total_revenue = db.query(func.sum(Order.total_amount)).filter(
        Order.payment_status == "paid"
    ).scalar() or 0
    
    today_revenue = db.query(func.sum(Order.total_amount)).filter(
        func.date(Order.created_at) == today,
        Order.payment_status == "paid"
    ).scalar() or 0
    
    # Reservation statistics
    total_reservations = db.query(Reservation).count()
    today_reservations = db.query(Reservation).filter(
        func.date(Reservation.reservation_date) == today
    ).count()
    
    pending_reservations = db.query(Reservation).filter(
        Reservation.status == ReservationStatus.PENDING
    ).count()
    
    # User statistics
    total_users = db.query(User).count()
    new_users_this_week = db.query(User).filter(
        func.date(User.created_at) >= week_ago
    ).count()
    
    return {
        "orders": {
            "total": total_orders,
            "today": today_orders,
            "pending": pending_orders
        },
        "revenue": {
            "total": float(total_revenue),
            "today": float(today_revenue)
        },
        "reservations": {
            "total": total_reservations,
            "today": today_reservations,
            "pending": pending_reservations
        },
        "users": {
            "total": total_users,
            "new_this_week": new_users_this_week
        }
    }

@router.get("/recent-orders")
async def get_recent_orders(
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user = Depends(get_admin_user)
):
    """Get recent orders for admin dashboard"""
    orders = db.query(Order).order_by(Order.created_at.desc()).limit(limit).all()
    return orders

@router.get("/recent-reservations")
async def get_recent_reservations(
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user = Depends(get_admin_user)
):
    """Get recent reservations for admin dashboard"""
    reservations = db.query(Reservation).order_by(
        Reservation.created_at.desc()
    ).limit(limit).all()
    return reservations

@router.get("/popular-items")
async def get_popular_menu_items(
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user = Depends(get_admin_user)
):
    """Get most popular menu items based on order frequency"""
    from app.db.models import OrderItem
    
    popular_items = db.query(
        MenuItem.id,
        MenuItem.name,
        MenuItem.price,
        func.sum(OrderItem.quantity).label('total_ordered')
    ).join(OrderItem).group_by(
        MenuItem.id, MenuItem.name, MenuItem.price
    ).order_by(
        func.sum(OrderItem.quantity).desc()
    ).limit(limit).all()
    
    return [
        {
            "id": item.id,
            "name": item.name,
            "price": item.price,
            "total_ordered": item.total_ordered
        }
        for item in popular_items
    ]

@router.get("/sales-analytics")
async def get_sales_analytics(
    days: int = 30,
    db: Session = Depends(get_db),
    current_user = Depends(get_admin_user)
):
    """Get sales analytics for the specified number of days"""
    start_date = datetime.now().date() - timedelta(days=days)
    
    daily_sales = db.query(
        func.date(Order.created_at).label('date'),
        func.count(Order.id).label('order_count'),
        func.sum(Order.total_amount).label('revenue')
    ).filter(
        func.date(Order.created_at) >= start_date,
        Order.payment_status == "paid"
    ).group_by(
        func.date(Order.created_at)
    ).order_by(
        func.date(Order.created_at)
    ).all()
    
    return [
        {
            "date": str(day.date),
            "order_count": day.order_count,
            "revenue": float(day.revenue or 0)
        }
        for day in daily_sales
    ]

@router.get("/users", response_model=List[UserSchema])
async def get_all_users(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user = Depends(get_admin_user)
):
    """Get all users for admin management"""
    users = db.query(User).offset(skip).limit(limit).all()
    return users

@router.put("/users/{user_id}/toggle-active")
async def toggle_user_active_status(
    user_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_admin_user)
):
    """Toggle user active status"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    user.is_active = not user.is_active
    db.commit()
    db.refresh(user)
    
    return {"message": f"User {'activated' if user.is_active else 'deactivated'} successfully"}