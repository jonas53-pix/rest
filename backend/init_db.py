#!/usr/bin/env python3
"""
Database initialization script for TastyBite Restaurant Management System
Run this script to create all database tables
"""

import sys
import os

# Add the app directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'app'))

from app.db.database import engine
from app.db.models import Base
from app.core.config import settings

def init_database():
    """Initialize the database by creating all tables"""
    print("Connecting to database...")
    print(f"Database URL: {settings.DATABASE_URL}")
    
    try:
        # Create all tables
        print("Creating database tables...")
        Base.metadata.create_all(bind=engine)
        print("✅ Database tables created successfully!")
        
        print("\nDatabase initialization completed!")
        print("You can now start the FastAPI server.")
        
    except Exception as e:
        print(f"❌ Error creating database tables: {e}")
        print("\nMake sure:")
        print("1. XAMPP is running (Apache and MySQL)")
        print("2. Database 'tastybite_db' exists in phpMyAdmin")
        print("3. MySQL service is started")
        sys.exit(1)

if __name__ == "__main__":
    init_database()

