# TastyBite Restaurant Backend API

A comprehensive backend API for the TastyBite restaurant management system built with FastAPI, SQLAlchemy, and PostgreSQL.

## Features

- **User Authentication & Authorization**: JWT-based authentication with role-based access control
- **Menu Management**: Full CRUD operations for categories and menu items
- **Order Management**: Complete order processing system with status tracking
- **Reservation System**: Table reservation management with availability checking
- **Inventory Management**: Stock tracking and low-stock alerts
- **Payment Integration**: Stripe payment processing
- **Admin Dashboard**: Comprehensive analytics and management tools
- **Email Notifications**: Automated email confirmations and notifications

## Tech Stack

- **Framework**: FastAPI
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT tokens with bcrypt password hashing
- **Payment Processing**: Stripe API
- **Email Service**: SMTP with HTML templates
- **Testing**: Pytest with test database
- **Database Migrations**: Alembic

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   └── api_v1/
│   │       └── endpoints/     # API route handlers
│   ├── core/                  # Core functionality (config, security)
│   ├── crud/                  # Database operations
│   ├── db/                    # Database models and connection
│   ├── schemas/               # Pydantic models for request/response
│   ├── services/              # Business logic services
│   └── utils/                 # Utility functions
├── alembic/                   # Database migrations
├── tests/                     # Test suite
└── requirements.txt           # Python dependencies
```

## Setup Instructions

### 1. Environment Setup

Create a virtual environment and install dependencies:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Environment Variables

Copy `.env.example` to `.env` and configure your settings:

```bash
cp .env.example .env
```

Update the following variables in `.env`:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/tastybite_db

# JWT
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Stripe (optional)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

### 3. Database Setup

Create a PostgreSQL database and run migrations:

```bash
# Create database (using psql)
createdb tastybite_db

# Run migrations
alembic upgrade head
```

### 4. Run the Application

Start the development server:

```bash
python -m app.main
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, you can access:

- **Interactive API docs**: `http://localhost:8000/docs`
- **ReDoc documentation**: `http://localhost:8000/redoc`
- **OpenAPI JSON**: `http://localhost:8000/openapi.json`

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - User login

### Users
- `GET /api/v1/users/me` - Get current user profile
- `PUT /api/v1/users/me` - Update current user profile

### Menu
- `GET /api/v1/menu/categories` - Get all categories
- `GET /api/v1/menu/items` - Get all menu items
- `GET /api/v1/menu/items/{item_id}` - Get specific menu item

### Orders
- `POST /api/v1/orders/` - Create new order
- `GET /api/v1/orders/my-orders` - Get user's orders
- `GET /api/v1/orders/{order_id}` - Get specific order

### Reservations
- `POST /api/v1/reservations/` - Create new reservation
- `GET /api/v1/reservations/my-reservations` - Get user's reservations
- `GET /api/v1/reservations/{reservation_id}` - Get specific reservation

### Admin (Requires admin/manager role)
- `GET /api/v1/admin/dashboard` - Get dashboard statistics
- `GET /api/v1/admin/recent-orders` - Get recent orders
- `GET /api/v1/admin/sales-analytics` - Get sales analytics
- `GET /api/v1/inventory/` - Manage inventory items

## Database Models

### Core Models
- **User**: Customer and admin user accounts
- **Category**: Menu item categories
- **MenuItem**: Restaurant menu items
- **Order**: Customer orders with items
- **OrderItem**: Individual items within an order
- **Reservation**: Table reservations
- **Payment**: Payment processing records
- **InventoryItem**: Stock management
- **Settings**: Application configuration

## Testing

Run the test suite:

```bash
pytest
```

Run with coverage:

```bash
pytest --cov=app
```

## Development

### Adding New Endpoints

1. Create the endpoint in `app/api/api_v1/endpoints/`
2. Add CRUD operations in `app/crud/`
3. Define Pydantic schemas in `app/schemas/`
4. Add tests in `tests/`

### Database Migrations

Create a new migration:

```bash
alembic revision --autogenerate -m "Description of changes"
```

Apply migrations:

```bash
alembic upgrade head
```

### Code Quality

The project follows these standards:
- Type hints for all functions
- Pydantic models for request/response validation
- Comprehensive error handling
- Security best practices (password hashing, JWT tokens)
- Clean architecture with separation of concerns

## Production Deployment

### Environment Variables
Set `ENVIRONMENT=production` and use secure values for all secrets.

### Database
Use a production PostgreSQL instance with proper backup strategies.

### Security
- Use HTTPS in production
- Set secure JWT secret keys
- Configure CORS properly
- Use environment variables for all sensitive data

### Monitoring
Consider adding:
- Application monitoring (e.g., Sentry)
- Database monitoring
- API rate limiting
- Logging aggregation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License.