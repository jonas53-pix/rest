#!/usr/bin/env python3
"""
Script to check all users in the database
"""

import sys
import os

# Add the app directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'app'))

from app.db.database import SessionLocal
from app.db.models import User, UserRole

def check_all_users():
    """Check all users in the database"""
    db = SessionLocal()
    
    try:
        print("=" * 60)
        print("  All Users in Database")
        print("=" * 60)
        
        # Get all users
        users = db.query(User).all()
        
        if not users:
            print("❌ No users found in database!")
            return
        
        print(f"📊 Total users found: {len(users)}")
        print()
        
        for i, user in enumerate(users, 1):
            print(f"👤 User #{i}:")
            print(f"   📧 Email: {user.email}")
            print(f"   👤 Name: {user.name}")
            print(f"   📱 Phone: {user.phone}")
            print(f"   🔐 Role: {user.role}")
            print(f"   ✅ Active: {user.is_active}")
            print(f"   📅 Created: {user.created_at}")
            print()
        
        # Count by role
        admin_count = db.query(User).filter(User.role == UserRole.ADMIN).count()
        customer_count = db.query(User).filter(User.role == UserRole.CUSTOMER).count()
        
        print("📈 Summary:")
        print(f"   🔐 Admins: {admin_count}")
        print(f"   👥 Customers: {customer_count}")
        print("=" * 60)
        
    except Exception as e:
        print(f"❌ Error checking users: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    check_all_users()
