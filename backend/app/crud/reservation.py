from typing import List, Optional
from sqlalchemy.orm import Session
from app.db.models import Reservation
from app.schemas.reservation import ReservationCreate, ReservationUpdate

def get_reservation(db: Session, reservation_id: int) -> Optional[Reservation]:
    return db.query(Reservation).filter(Reservation.id == reservation_id).first()

def get_reservations(db: Session, skip: int = 0, limit: int = 100) -> List[Reservation]:
    return db.query(Reservation).order_by(Reservation.reservation_date.desc()).offset(skip).limit(limit).all()

def get_user_reservations(db: Session, user_id: int, skip: int = 0, limit: int = 100) -> List[Reservation]:
    return db.query(Reservation).filter(Reservation.customer_id == user_id).order_by(Reservation.reservation_date.desc()).offset(skip).limit(limit).all()

def create_reservation(db: Session, reservation: ReservationCreate, customer_id: int) -> Reservation:
    db_reservation = Reservation(
        customer_id=customer_id,
        **reservation.dict()
    )
    db.add(db_reservation)
    db.commit()
    db.refresh(db_reservation)
    return db_reservation

def update_reservation(db: Session, reservation_id: int, reservation_update: ReservationUpdate) -> Optional[Reservation]:
    db_reservation = db.query(Reservation).filter(Reservation.id == reservation_id).first()
    if not db_reservation:
        return None
    
    update_data = reservation_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_reservation, field, value)
    
    db.commit()
    db.refresh(db_reservation)
    return db_reservation

def delete_reservation(db: Session, reservation_id: int) -> bool:
    db_reservation = db.query(Reservation).filter(Reservation.id == reservation_id).first()
    if not db_reservation:
        return False
    
    db.delete(db_reservation)
    db.commit()
    return True