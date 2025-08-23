import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import List, Optional
from app.core.config import settings

class EmailService:
    def __init__(self):
        self.smtp_host = settings.SMTP_HOST
        self.smtp_port = settings.SMTP_PORT
        self.smtp_user = settings.SMTP_USER
        self.smtp_password = settings.SMTP_PASSWORD
    
    def send_email(
        self,
        to_emails: List[str],
        subject: str,
        body: str,
        html_body: Optional[str] = None,
        from_email: Optional[str] = None
    ) -> bool:
        """Send email to recipients"""
        try:
            msg = MIMEMultipart('alternative')
            msg['Subject'] = subject
            msg['From'] = from_email or self.smtp_user
            msg['To'] = ', '.join(to_emails)
            
            # Add plain text part
            text_part = MIMEText(body, 'plain')
            msg.attach(text_part)
            
            # Add HTML part if provided
            if html_body:
                html_part = MIMEText(html_body, 'html')
                msg.attach(html_part)
            
            # Send email
            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_user, self.smtp_password)
                server.send_message(msg)
            
            return True
        except Exception as e:
            print(f"Email sending failed: {str(e)}")
            return False
    
    def send_order_confirmation(self, to_email: str, order_number: str, total_amount: float) -> bool:
        """Send order confirmation email"""
        subject = f"Order Confirmation - {order_number}"
        body = f"""
        Dear Customer,
        
        Thank you for your order! Your order {order_number} has been confirmed.
        
        Order Total: GH₵{total_amount:.2f}
        
        We'll notify you when your order is ready.
        
        Best regards,
        TastyBite Restaurant
        """
        
        html_body = f"""
        <html>
        <body>
            <h2>Order Confirmation</h2>
            <p>Dear Customer,</p>
            <p>Thank you for your order! Your order <strong>{order_number}</strong> has been confirmed.</p>
            <p><strong>Order Total:</strong> GH₵{total_amount:.2f}</p>
            <p>We'll notify you when your order is ready.</p>
            <p>Best regards,<br>TastyBite Restaurant</p>
        </body>
        </html>
        """
        
        return self.send_email([to_email], subject, body, html_body)
    
    def send_reservation_confirmation(self, to_email: str, reservation_date: str, party_size: int) -> bool:
        """Send reservation confirmation email"""
        subject = "Reservation Confirmation - TastyBite"
        body = f"""
        Dear Customer,
        
        Your reservation has been confirmed!
        
        Date & Time: {reservation_date}
        Party Size: {party_size} people
        
        We look forward to serving you.
        
        Best regards,
        TastyBite Restaurant
        """
        
        html_body = f"""
        <html>
        <body>
            <h2>Reservation Confirmation</h2>
            <p>Dear Customer,</p>
            <p>Your reservation has been confirmed!</p>
            <p><strong>Date & Time:</strong> {reservation_date}</p>
            <p><strong>Party Size:</strong> {party_size} people</p>
            <p>We look forward to serving you.</p>
            <p>Best regards,<br>TastyBite Restaurant</p>
        </body>
        </html>
        """
        
        return self.send_email([to_email], subject, body, html_body)