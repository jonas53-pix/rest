#!/usr/bin/env python3
"""
Test admin login specifically
"""

import requests
import json

def test_admin_login():
    """Test admin login with the specified credentials"""
    
    # Admin credentials
    admin_credentials = {
        "email": "admin@gmail.com",
        "password": "admin12345"
    }
    
    try:
        print("🔐 Testing Admin Login...")
        print(f"📧 Email: {admin_credentials['email']}")
        print(f"🔑 Password: {admin_credentials['password']}")
        print()
        
        # Test the login endpoint
        response = requests.post(
            'http://localhost:8000/api/v1/auth/login-json',
            json=admin_credentials,
            headers={'Content-Type': 'application/json'}
        )
        
        print(f"📡 Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Login Successful!")
            print(f"🔑 Token: {data.get('access_token', 'N/A')[:50]}...")
            print(f"👤 User: {data.get('user', 'N/A')}")
            print()
            print("🎉 Admin login is working correctly!")
            return True
        else:
            print("❌ Login Failed!")
            print(f"📄 Response: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Connection Error: Backend server is not running!")
        print("💡 Make sure to start the backend server first:")
        print("   cd backend")
        print("   python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000")
        return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    test_admin_login()
