#!/usr/bin/env python3
"""
Script to test login credentials and show available passwords
"""

import sys
import os

# Add the app directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'app'))

from app.db.database import SessionLocal
from app.db.models import User, UserRole
from app.core.security import verify_password

def test_login_credentials():
    """Test login credentials and show available passwords"""
    db = SessionLocal()
    
    try:
        print("=" * 60)
        print("  Available Login Credentials")
        print("=" * 60)
        
        # Get all users
        users = db.query(User).all()
        
        if not users:
            print("❌ No users found in database!")
            return
        
        print(f"📊 Total users found: {len(users)}")
        print()
        
        # Test credentials for each user
        for i, user in enumerate(users, 1):
            print(f"👤 User #{i}:")
            print(f"   📧 Email: {user.email}")
            print(f"   👤 Name: {user.name}")
            print(f"   🔐 Role: {user.role}")
            print(f"   ✅ Active: {user.is_active}")
            
            # Test common passwords
            test_passwords = [
                "admin123",
                "admin12345", 
                "user12345",
                "customer123",
                "password",
                "123456",
                "superadmin2024"
            ]
            
            print("   🔑 Testing passwords:")
            for password in test_passwords:
                if verify_password(password, user.hashed_password):
                    print(f"      ✅ {password} - CORRECT!")
                    break
            else:
                print(f"      ❌ None of the test passwords worked")
            
            print()
        
        print("=" * 60)
        print("💡 Try these credentials:")
        print("   Admin: admin@gmail.com / admin12345")
        print("   Customer: User@gmail.com / user12345")
        print("   Super Admin: superadmin@tastybite.com / superadmin2024")
        print("=" * 60)
        
    except Exception as e:
        print(f"❌ Error testing credentials: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    test_login_credentials()
