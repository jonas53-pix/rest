from fastapi import APIRouter

from app.api.api_v1.endpoints import auth, users, menu, orders, reservations, inventory, admin
from app.api.api_v1.endpoints import table_availability

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(menu.router, prefix="/menu", tags=["menu"])
api_router.include_router(orders.router, prefix="/orders", tags=["orders"])
api_router.include_router(reservations.router, prefix="/reservations", tags=["reservations"])
api_router.include_router(table_availability.router, prefix="/tables", tags=["table-availability"])
api_router.include_router(inventory.router, prefix="/inventory", tags=["inventory"])
api_router.include_router(admin.router, prefix="/admin", tags=["admin"])