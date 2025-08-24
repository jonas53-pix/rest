#!/usr/bin/env python3
"""
Setup script for TastyBite Restaurant Management System
This script will help you set up the database and start the server
"""

import os
import sys
import subprocess
import time

def print_header():
    print("=" * 60)
    print("  TastyBite Restaurant Management System Setup")
    print("=" * 60)
    print()

def check_xampp():
    print("🔍 Checking XAMPP status...")
    print("Please make sure:")
    print("1. XAMPP Control Panel is open")
    print("2. MySQL service is started (green light)")
    print("3. Apache service is started (green light)")
    print()
    
    input("Press Enter when XAMPP is running...")
    print()

def create_database():
    print("🗄️  Creating database...")
    print("Please follow these steps:")
    print("1. Open phpMyAdmin (click 'Admin' next to MySQL in XAMPP)")
    print("2. Click 'New' on the left sidebar")
    print("3. Enter database name: tastybite_db")
    print("4. Click 'Create'")
    print()
    
    input("Press Enter when database is created...")
    print()

def install_dependencies():
    print("📦 Installing Python dependencies...")
    try:
        subprocess.run([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"], check=True)
        print("✅ Dependencies installed successfully!")
    except subprocess.CalledProcessError:
        print("❌ Failed to install dependencies")
        return False
    print()

def init_database():
    print("🗃️  Initializing database tables...")
    try:
        subprocess.run([sys.executable, "init_db.py"], check=True)
        print("✅ Database tables created successfully!")
        return True
    except subprocess.CalledProcessError:
        print("❌ Failed to create database tables")
        return False

def create_sample_data():
    print("📝 Creating sample data...")
    try:
        subprocess.run([sys.executable, "sample_data.py"], check=True)
        print("✅ Sample data created successfully!")
        return True
    except subprocess.CalledProcessError:
        print("❌ Failed to create sample data")
        return False

def start_server():
    print("🚀 Starting FastAPI server...")
    print("The server will start on http://localhost:8000")
    print("Press Ctrl+C to stop the server")
    print()
    
    try:
        subprocess.run([sys.executable, "-m", "uvicorn", "app.main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"])
    except KeyboardInterrupt:
        print("\n👋 Server stopped. Goodbye!")

def main():
    print_header()
    
    # Check XAMPP
    check_xampp()
    
    # Create database
    create_database()
    
    # Install dependencies
    if not install_dependencies():
        print("❌ Setup failed. Please check the errors above.")
        return
    
    # Initialize database
    if not init_database():
        print("❌ Setup failed. Please check the errors above.")
        return
    
    # Create sample data
    if not create_sample_data():
        print("❌ Setup failed. Please check the errors above.")
        return
    
    print("🎉 Setup completed successfully!")
    print()
    print("Next steps:")
    print("1. Frontend is running at: http://localhost:5173")
    print("2. Backend API is running at: http://localhost:8000")
    print("3. API documentation at: http://localhost:8000/docs")
    print()
    print("Sample users:")
    print("- Admin: admin@tastybite.com / admin123")
    print("- Customer: customer@example.com / customer123")
    print()
    
    # Ask if user wants to start the server
    response = input("Would you like to start the FastAPI server now? (y/n): ")
    if response.lower() in ['y', 'yes']:
        start_server()
    else:
        print("To start the server later, run:")
        print("python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000")

if __name__ == "__main__":
    main()

