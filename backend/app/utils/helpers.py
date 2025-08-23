from typing import Dict, Any
from datetime import datetime, timedelta
import re

def validate_email(email: str) -> bool:
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_phone(phone: str) -> bool:
    """Validate phone number format"""
    # Remove all non-digit characters
    digits_only = re.sub(r'\D', '', phone)
    # Check if it's a valid length (10-15 digits)
    return 10 <= len(digits_only) <= 15

def format_currency(amount: float, currency: str = "GHS") -> str:
    """Format currency amount"""
    return f"{currency} {amount:.2f}"

def calculate_order_totals(subtotal: float, tax_rate: float = 0.08, service_charge_rate: float = 0.10) -> Dict[str, float]:
    """Calculate order totals including tax and service charge"""
    tax_amount = subtotal * tax_rate
    service_charge = subtotal * service_charge_rate
    total_amount = subtotal + tax_amount + service_charge
    
    return {
        "subtotal": round(subtotal, 2),
        "tax_amount": round(tax_amount, 2),
        "service_charge": round(service_charge, 2),
        "total_amount": round(total_amount, 2)
    }

def generate_time_slots(start_hour: int = 17, end_hour: int = 22, interval_minutes: int = 30) -> list:
    """Generate available time slots for reservations"""
    slots = []
    current_time = datetime.now().replace(hour=start_hour, minute=0, second=0, microsecond=0)
    end_time = datetime.now().replace(hour=end_hour, minute=0, second=0, microsecond=0)
    
    while current_time <= end_time:
        slots.append(current_time.strftime("%I:%M %p"))
        current_time += timedelta(minutes=interval_minutes)
    
    return slots

def is_business_hours(check_time: datetime = None) -> bool:
    """Check if current time is within business hours"""
    if check_time is None:
        check_time = datetime.now()
    
    # Business hours: 11 AM to 10 PM
    business_start = 11
    business_end = 22
    
    current_hour = check_time.hour
    return business_start <= current_hour < business_end

def sanitize_string(text: str) -> str:
    """Sanitize string input"""
    if not text:
        return ""
    
    # Remove HTML tags and extra whitespace
    text = re.sub(r'<[^>]+>', '', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def paginate_query(query, page: int = 1, per_page: int = 20):
    """Paginate SQLAlchemy query"""
    total = query.count()
    items = query.offset((page - 1) * per_page).limit(per_page).all()
    
    return {
        "items": items,
        "total": total,
        "page": page,
        "per_page": per_page,
        "pages": (total + per_page - 1) // per_page
    }