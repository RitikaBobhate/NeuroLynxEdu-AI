"""
User management endpoints
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class UserProfile(BaseModel):
    id: int
    username: str
    email: str
    full_name: str
    avatar_url: Optional[str] = None
    learning_preferences: dict = {}
    eeg_device_connected: bool = False

class UserStats(BaseModel):
    total_courses: int
    completed_courses: int
    focus_average: float
    ai_sessions: int
    learning_streak: int

@router.get("/profile", response_model=UserProfile)
async def get_user_profile():
    """Get user profile"""
    return UserProfile(
        id=1,
        username="demo",
        email="demo@neurolynx.edu",
        full_name="Demo User",
        learning_preferences={
            "preferred_difficulty": "intermediate",
            "learning_style": "visual",
            "session_duration": 45
        }
    )

@router.put("/profile")
async def update_user_profile(profile: UserProfile):
    """Update user profile"""
    return {"message": "Profile updated successfully"}

@router.get("/stats", response_model=UserStats)
async def get_user_stats():
    """Get user learning statistics"""
    return UserStats(
        total_courses=12,
        completed_courses=8,
        focus_average=87.5,
        ai_sessions=24,
        learning_streak=7
    )