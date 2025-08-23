from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.db.models import ReservationStatus

class ReservationBase(BaseModel):
    reservation_date: datetime
    party_size: int
    special_requests: Optional[str] = None
    occasion: Optional[str] = None

class ReservationCreate(ReservationBase):
    pass

class ReservationUpdate(BaseModel):
    reservation_date: Optional[datetime] = None
    party_size: Optional[int] = None
    status: Optional[ReservationStatus] = None
    table_number: Optional[str] = None
    special_requests: Optional[str] = None
    occasion: Optional[str] = None

class Reservation(ReservationBase):
    id: int
    customer_id: int
    status: ReservationStatus
    table_number: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True