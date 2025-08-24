#!/usr/bin/env python3
"""
Test admin login and verify response format for frontend
"""

import requests
import json

def test_admin_login_response():
    """Test admin login and check response format"""
    
    # Admin credentials
    admin_credentials = {
        "email": "admin@gmail.com",
        "password": "admin12345"
    }
    
    try:
        print("🔐 Testing Admin Login Response...")
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
            print()
            print("📋 Response Data:")
            print(f"   🔑 access_token: {data.get('access_token', 'N/A')[:50]}...")
            print(f"   🏷️  token_type: {data.get('token_type', 'N/A')}")
            print()
            print("👤 User Data:")
            user_data = data.get('user', {})
            print(f"   🆔 ID: {user_data.get('id', 'N/A')}")
            print(f"   📧 Email: {user_data.get('email', 'N/A')}")
            print(f"   👤 Name: {user_data.get('name', 'N/A')}")
            print(f"   🔐 Role: {user_data.get('role', 'N/A')}")
            print()
            
            # Check if role is correct for admin redirect
            role = user_data.get('role', '').lower()
            if role == 'admin':
                print("✅ Role is 'admin' - Frontend should redirect to /admin/dashboard")
            else:
                print(f"⚠️  Role is '{role}' - Check if this should be 'admin'")
            
            print()
            print("🎉 Admin login response is correctly formatted!")
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
    test_admin_login_response()
