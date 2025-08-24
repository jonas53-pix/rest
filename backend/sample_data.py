#!/usr/bin/env python3
"""
Sample data population script for TastyBite Restaurant Management System
Run this after init_db.py to populate the database with sample data
"""

import sys
import os
from datetime import datetime

# Add the app directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'app'))

from app.db.database import SessionLocal
from app.db.models import User, Category, MenuItem, OrderStatus, OrderType, PaymentStatus, UserRole
from app.core.security import get_password_hash

def create_sample_data():
    """Create sample data for testing"""
    db = SessionLocal()
    
    try:
        print("Creating sample data...")
        
        # Create admin user
        admin_user = User(
            email="admin@tastybite.com",
            name="Admin User",
            phone="+233-20-123-4567",
            hashed_password=get_password_hash("admin123"),
            role=UserRole.ADMIN,
            is_active=True
        )
        db.add(admin_user)
        
        # Create customer user
        customer_user = User(
            email="customer@example.com",
            name="John Doe",
            phone="+233-20-987-6543",
            hashed_password=get_password_hash("customer123"),
            role=UserRole.CUSTOMER,
            is_active=True
        )
        db.add(customer_user)
        
        # Create categories
        categories = [
            Category(name="Appetizers", description="Start your meal right", slug="appetizers"),
            Category(name="Main Course", description="Delicious main dishes", slug="main-course"),
            Category(name="Desserts", description="Sweet endings", slug="desserts"),
            Category(name="Beverages", description="Refreshing drinks", slug="beverages")
        ]
        
        for category in categories:
            db.add(category)
        
        db.commit()
        
        # Create menu items
        menu_items = [
            MenuItem(
                name="Chicken Wings",
                description="Crispy fried chicken wings with your choice of sauce",
                price=25.00,
                image_url="https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg",
                category_id=1,
                is_available=True,
                is_featured=True,
                calories=350,
                preparation_time=15
            ),
            MenuItem(
                name="Grilled Salmon",
                description="Fresh Atlantic salmon grilled to perfection",
                price=45.00,
                image_url="https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg",
                category_id=2,
                is_available=True,
                is_featured=True,
                calories=420,
                preparation_time=25
            ),
            MenuItem(
                name="Chocolate Cake",
                description="Rich chocolate cake with chocolate ganache",
                price=15.00,
                image_url="https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg",
                category_id=3,
                is_available=True,
                is_featured=False,
                calories=280,
                preparation_time=5
            ),
            MenuItem(
                name="Fresh Orange Juice",
                description="100% natural orange juice",
                price=8.00,
                image_url="https://images.pexels.com/photos/42059/citrus-diet-food-fresh-42059.jpeg",
                category_id=4,
                is_available=True,
                is_featured=False,
                calories=110,
                preparation_time=2
            )
        ]
        
        for item in menu_items:
            db.add(item)
        
        db.commit()
        
        print("✅ Sample data created successfully!")
        print("\nSample users created:")
        print("Admin: admin@tastybite.com / admin123")
        print("Customer: customer@example.com / customer123")
        
    except Exception as e:
        print(f"❌ Error creating sample data: {e}")
        db.rollback()
        sys.exit(1)
    finally:
        db.close()

if __name__ == "__main__":
    create_sample_data()

