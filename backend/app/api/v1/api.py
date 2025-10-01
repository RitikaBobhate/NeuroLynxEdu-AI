"""
API v1 Router
"""
from fastapi import APIRouter

from app.api.v1.endpoints import auth, users, courses, analytics, eeg_demo

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(courses.router, prefix="/courses", tags=["courses"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
api_router.include_router(eeg_demo.router, prefix="/eeg", tags=["eeg"])