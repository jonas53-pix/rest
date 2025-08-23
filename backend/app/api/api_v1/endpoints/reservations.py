from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_active_user, get_admin_user
from app.db.database import get_db
from app.schemas.reservation import Reservation, ReservationCreate, ReservationUpdate
from app.crud.reservation import (
    get_reservations, get_reservation, create_reservation, update_reservation, delete_reservation,
    get_user_reservations
)

router = APIRouter()

@router.get("/", response_model=List[Reservation])
async def read_reservations(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user = Depends(get_admin_user)
):
    return get_reservations(db, skip=skip, limit=limit)

@router.post("/", response_model=Reservation)
async def create_new_reservation(
    reservation: ReservationCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    return create_reservation(db, reservation, current_user.id)

@router.get("/my-reservations", response_model=List[Reservation])
async def read_my_reservations(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    return get_user_reservations(db, current_user.id, skip=skip, limit=limit)

@router.get("/{reservation_id}", response_model=Reservation)
async def read_reservation(
    reservation_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    reservation = get_reservation(db, reservation_id)
    if not reservation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Reservation not found"
        )
    
    # Check if user owns the reservation or is admin
    if reservation.customer_id != current_user.id and current_user.role not in ["admin", "manager"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    return reservation

@router.put("/{reservation_id}", response_model=Reservation)
async def update_existing_reservation(
    reservation_id: int,
    reservation_update: ReservationUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    reservation = get_reservation(db, reservation_id)
    if not reservation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Reservation not found"
        )
    
    # Check if user owns the reservation or is admin
    if reservation.customer_id != current_user.id and current_user.role not in ["admin", "manager"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    return update_reservation(db, reservation_id, reservation_update)

@router.delete("/{reservation_id}")
async def delete_existing_reservation(
    reservation_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    reservation = get_reservation(db, reservation_id)
    if not reservation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Reservation not found"
        )
    
    # Check if user owns the reservation or is admin
    if reservation.customer_id != current_user.id and current_user.role not in ["admin", "manager"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    success = delete_reservation(db, reservation_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Reservation not found"
        )
    return {"message": "Reservation deleted successfully"}