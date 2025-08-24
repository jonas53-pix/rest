# Database Setup Guide for TastyBite Restaurant Management System

## Prerequisites
- XAMPP installed and running
- Python 3.8+ installed
- All Python dependencies installed (`pip install -r requirements.txt`)

## Step 1: Start XAMPP
1. Open XAMPP Control Panel
2. Start **Apache** service
3. Start **MySQL** service
4. Make sure both services show green status

## Step 2: Create Database in phpMyAdmin
1. Click **Admin** button next to MySQL in XAMPP Control Panel
2. phpMyAdmin will open in your browser
3. Click **New** on the left sidebar
4. Enter database name: `tastybite_db`
5. Click **Create**

## Step 3: Initialize Database Tables
Run the database initialization script:
```bash
cd backend
python init_db.py
```

This will create all the necessary tables in your database.

## Step 4: Populate with Sample Data (Optional)
To add sample data for testing:
```bash
python sample_data.py
```

This creates:
- Admin user: `admin@tastybite.com` / `admin123`
- Customer user: `customer@example.com` / `customer123`
- Sample categories and menu items

## Step 5: Start the Backend Server
```bash
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Step 6: Test the API
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## Troubleshooting

### Common Issues:

1. **"Access denied for user 'root'@'localhost'"**
   - Make sure MySQL is running in XAMPP
   - Check if you have a password set for root user
   - Update DATABASE_URL in config.py if needed

2. **"Can't connect to MySQL server"**
   - Verify MySQL service is started in XAMPP
   - Check if port 3306 is not blocked

3. **"No module named 'app'"**
   - Make sure you're in the backend directory
   - Run: `python -m uvicorn app.main:app --reload`

4. **Database connection errors**
   - Verify database name is correct
   - Check MySQL service status
   - Ensure no firewall blocking the connection

## Database Schema
The system creates the following tables:
- `users` - User accounts and authentication
- `categories` - Menu categories
- `menu_items` - Food items
- `orders` - Customer orders
- `order_items` - Individual items in orders
- `reservations` - Table reservations
- `payments` - Payment records
- `inventory_items` - Stock management

## Security Notes
- Change default passwords in production
- Update SECRET_KEY in production
- Use environment variables for sensitive data
- Enable SSL in production

