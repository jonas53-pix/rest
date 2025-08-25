import os
from typing import Optional

class SMSService:
    def __init__(self):
        # In production, you would use a service like Twilio
        self.enabled = os.getenv("SMS_ENABLED", "false").lower() == "true"
        self.api_key = os.getenv("SMS_API_KEY", "")
    
    def send_sms(self, phone: str, message: str) -> bool:
        """Send SMS message"""
        if not self.enabled:
            print(f"SMS (Mock): To {phone}: {message}")
            return True
        
        try:
            # In production, implement actual SMS sending logic
            # Example with Twilio:
            # from twilio.rest import Client
            # client = Client(account_sid, auth_token)
            # message = client.messages.create(
            #     body=message,
            #     from_='+1234567890',
            #     to=phone
            # )
            print(f"SMS sent to {phone}: {message}")
            return True
        except Exception as e:
            print(f"SMS sending failed: {str(e)}")
            return False
    
    def send_reservation_confirmation(self, phone: str, reservation_id: str, date_time: str) -> bool:
        """Send reservation confirmation SMS"""
        message = f"TastyBite: Your reservation {reservation_id} is confirmed for {date_time}. See you soon!"
        return self.send_sms(phone, message)
    
    def send_reservation_reminder(self, phone: str, reservation_id: str, date_time: str) -> bool:
        """Send reservation reminder SMS"""
        message = f"TastyBite: Reminder - Your reservation {reservation_id} is today at {date_time}. Call us if you need to make changes."
        return self.send_sms(phone, message)