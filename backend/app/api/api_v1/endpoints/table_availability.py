from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from pydantic import BaseModel

from app.api.deps import get_current_active_user
from app.db.database import get_db
from app.schemas.reservation import ReservationCreate
from app.crud.reservation import create_reservation
from app.services.email import EmailService
from app.services.sms import SMSService

router = APIRouter()

class TableAvailabilityRequest(BaseModel):
    date: str  # YYYY-MM-DD format
    time: str  # HH:MM format
    party_size: int

class AlternativeTime(BaseModel):
    time: str
    available_tables: int

class TableAvailabilityResponse(BaseModel):
    available: bool
    table_id: Optional[int] = None
    table_name: Optional[str] = None
    message: str
    alternatives: List[AlternativeTime] = []

class ReservationConfirmation(BaseModel):
    reservation_id: str
    table_name: str
    date: str
    time: str
    party_size: int
    customer_name: str
    status: str
    confirmation_sent: bool

# Mock table data - in production this would be in the database
TABLES = [
    {"id": 1, "name": "Table 1", "capacity": 2, "type": "window"},
    {"id": 2, "name": "Table 2", "capacity": 4, "type": "standard"},
    {"id": 3, "name": "Table 3", "capacity": 4, "type": "booth"},
    {"id": 4, "name": "Table 4", "capacity": 6, "type": "large"},
    {"id": 5, "name": "Table 5", "capacity": 8, "type": "private"},
    {"id": 6, "name": "Table 6", "capacity": 2, "type": "bar"},
    {"id": 7, "name": "Table 7", "capacity": 4, "type": "patio"},
    {"id": 8, "name": "Table 8", "capacity": 6, "type": "standard"},
]

# Mock existing reservations - in production this would query the database
EXISTING_RESERVATIONS = [
    {"table_id": 2, "date": "2025-01-15", "time": "19:30", "party_size": 4},
    {"table_id": 4, "date": "2025-01-15", "time": "20:00", "party_size": 6},
]

def find_available_tables(date: str, time: str, party_size: int) -> List[dict]:
    """Find tables that can accommodate the party size and are not reserved"""
    available_tables = []
    
    for table in TABLES:
        if table["capacity"] >= party_size:
            # Check if table is already reserved at this time
            is_reserved = any(
                res["table_id"] == table["id"] and 
                res["date"] == date and 
                res["time"] == time
                for res in EXISTING_RESERVATIONS
            )
            
            if not is_reserved:
                available_tables.append(table)
    
    return available_tables

def get_alternative_times(date: str, requested_time: str, party_size: int) -> List[AlternativeTime]:
    """Get alternative times when tables are available"""
    alternatives = []
    
    # Generate time slots from 17:00 to 22:00 (5 PM to 10 PM)
    base_time = datetime.strptime("17:00", "%H:%M")
    end_time = datetime.strptime("22:00", "%H:%M")
    
    current_time = base_time
    while current_time <= end_time:
        time_str = current_time.strftime("%H:%M")
        
        # Skip the requested time since we know it's not available
        if time_str != requested_time:
            available_tables = find_available_tables(date, time_str, party_size)
            if available_tables:
                alternatives.append(AlternativeTime(
                    time=time_str,
                    available_tables=len(available_tables)
                ))
        
        current_time += timedelta(minutes=30)
    
    return alternatives[:4]  # Return max 4 alternatives

@router.post("/check-availability", response_model=TableAvailabilityResponse)
async def check_table_availability(
    request: TableAvailabilityRequest,
    db: Session = Depends(get_db)
):
    """Check if tables are available for the requested date, time, and party size"""
    try:
        # Validate date format
        try:
            datetime.strptime(request.date, "%Y-%m-%d")
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid date format. Use YYYY-MM-DD"
            )
        
        # Validate time format
        try:
            datetime.strptime(request.time, "%H:%M")
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid time format. Use HH:MM"
            )
        
        # Validate party size
        if request.party_size < 1 or request.party_size > 12:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Party size must be between 1 and 12"
            )
        
        # Find available tables
        available_tables = find_available_tables(request.date, request.time, request.party_size)
        
        if available_tables:
            # Select the best table (smallest that fits the party)
            best_table = min(available_tables, key=lambda t: t["capacity"])
            
            return TableAvailabilityResponse(
                available=True,
                table_id=best_table["id"],
                table_name=best_table["name"],
                message=f"Table for {request.party_size} available at {request.time}",
                alternatives=[]
            )
        else:
            # No tables available, get alternatives
            alternatives = get_alternative_times(request.date, request.time, request.party_size)
            
            if alternatives:
                alt_times = [alt.time for alt in alternatives[:2]]
                message = f"No table available at {request.time}, but available at {' or '.join(alt_times)}"
            else:
                message = f"No tables available for {request.party_size} people on {request.date}"
            
            return TableAvailabilityResponse(
                available=False,
                message=message,
                alternatives=alternatives
            )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error checking table availability"
        )

@router.post("/confirm-reservation", response_model=ReservationConfirmation)
async def confirm_reservation(
    reservation_data: ReservationCreate,
    table_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    """Confirm and create a reservation"""
    try:
        # Double-check availability before confirming
        available_tables = find_available_tables(
            reservation_data.reservation_date.strftime("%Y-%m-%d"),
            reservation_data.reservation_date.strftime("%H:%M"),
            reservation_data.party_size
        )
        
        selected_table = next((t for t in available_tables if t["id"] == table_id), None)
        if not selected_table:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Table is no longer available. Please select a different time."
            )
        
        # Create the reservation
        reservation = create_reservation(db, reservation_data, current_user.id)
        
        # Generate reservation ID
        reservation_id = f"RES-{reservation.id:06d}"
        
        # Add to mock reservations (in production, this would be handled by the database)
        EXISTING_RESERVATIONS.append({
            "table_id": table_id,
            "date": reservation_data.reservation_date.strftime("%Y-%m-%d"),
            "time": reservation_data.reservation_date.strftime("%H:%M"),
            "party_size": reservation_data.party_size
        })
        
        # Send confirmation email and SMS
        confirmation_sent = False
        try:
            email_service = EmailService()
            sms_service = SMSService()
            
            # Send email confirmation
            email_sent = email_service.send_reservation_confirmation(
                current_user.email,
                reservation_data.reservation_date.strftime("%B %d, %Y at %I:%M %p"),
                reservation_data.party_size
            )
            
            # Send SMS confirmation if phone number is provided
            sms_sent = True
            if current_user.phone:
                sms_sent = sms_service.send_reservation_confirmation(
                    current_user.phone,
                    reservation_id,
                    reservation_data.reservation_date.strftime("%m/%d at %I:%M %p")
                )
            
            confirmation_sent = email_sent and sms_sent
        except Exception as e:
            print(f"Error sending confirmation: {e}")
            # Don't fail the reservation if notification fails
        
        return ReservationConfirmation(
            reservation_id=reservation_id,
            table_name=selected_table["name"],
            date=reservation_data.reservation_date.strftime("%Y-%m-%d"),
            time=reservation_data.reservation_date.strftime("%H:%M"),
            party_size=reservation_data.party_size,
            customer_name=current_user.name,
            status="confirmed",
            confirmation_sent=confirmation_sent
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error confirming reservation"
        )