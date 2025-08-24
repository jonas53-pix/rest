#!/usr/bin/env python3
"""
Script to create a new admin user for TastyBite Restaurant Management System
"""

import sys
import os

# Add the app directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'app'))

from app.db.database import SessionLocal
from app.db.models import User, UserRole
from app.core.security import get_password_hash

def create_new_admin(email, password, name="New Admin"):
    """Create a new admin user with custom credentials"""
    db = SessionLocal()
    
    try:
        print(f"Creating new admin user: {email}")
        
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == email).first()
        if existing_user:
            print(f"❌ User with email {email} already exists!")
            return False
        
        # Create new admin user
        new_admin = User(
            email=email,
            name=name,
            phone="+233-20-000-0000",
            hashed_password=get_password_hash(password),
            role=UserRole.ADMIN,
            is_active=True
        )
        db.add(new_admin)
        db.commit()
        
        print(f"✅ New admin user created successfully!")
        print(f"📧 Email: {email}")
        print(f"🔑 Password: {password}")
        print(f"👤 Name: {name}")
        print(f"🔐 Role: Admin")
        
        return True
        
    except Exception as e:
        print(f"❌ Error creating admin user: {e}")
        db.rollback()
        return False
    finally:
        db.close()

if __name__ == "__main__":
    # Example credentials - you can change these
    NEW_ADMIN_EMAIL = "superadmin@tastybite.com"
    NEW_ADMIN_PASSWORD = "superadmin2024"
    NEW_ADMIN_NAME = "Super Admin"
    
    print("=" * 50)
    print("  Create New Admin User")
    print("=" * 50)
    print(f"Email: {NEW_ADMIN_EMAIL}")
    print(f"Password: {NEW_ADMIN_PASSWORD}")
    print(f"Name: {NEW_ADMIN_NAME}")
    print("=" * 50)
    
    # Create the admin user
    create_new_admin(NEW_ADMIN_EMAIL, NEW_ADMIN_PASSWORD, NEW_ADMIN_NAME)
