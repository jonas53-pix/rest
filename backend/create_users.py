#!/usr/bin/env python3
"""
Simple user creation script for TastyBite Restaurant Management System
"""

import sys
import os

# Add the app directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'app'))

from app.db.database import SessionLocal
from app.db.models import User, UserRole
from app.core.security import get_password_hash

def create_users():
    """Create basic user accounts"""
    db = SessionLocal()
    
    try:
        print("Creating user accounts...")
        
        # Check if users already exist
        existing_admin = db.query(User).filter(User.email == "admin@gmail.com").first()
        existing_customer = db.query(User).filter(User.email == "User@gmail.com").first()
        
        if not existing_admin:
            # Create admin user
            admin_user = User(
                email="admin@gmail.com",
                name="Admin User",
                phone="+233-20-123-4567",
                hashed_password=get_password_hash("admin12345"),
                role=UserRole.ADMIN,
                is_active=True
            )
            db.add(admin_user)
            print("✅ Admin user created: admin@gmail.com / admin12345")
        else:
            print("ℹ️  Admin user already exists")
        
        if not existing_customer:
            # Create customer user
            customer_user = User(
                email="User@gmail.com",
                name="John Doe",
                phone="+233-20-987-6543",
                hashed_password=get_password_hash("user12345"),
                role=UserRole.CUSTOMER,
                is_active=True
            )
            db.add(customer_user)
            print("✅ Customer user created: User@gmail.com / user12345")
        else:
            print("ℹ️  Customer user already exists")
        
        db.commit()
        print("✅ User accounts created successfully!")
        
    except Exception as e:
        print(f"❌ Error creating users: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_users()

