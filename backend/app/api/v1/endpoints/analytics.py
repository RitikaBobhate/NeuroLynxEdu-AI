"""
Analytics endpoints
"""
from fastapi import APIRouter

router = APIRouter()

@router.get("/dashboard")
async def get_dashboard():
    """Get analytics dashboard data"""
    return {
        "total_sessions": 45,
        "avg_attention": 72.5,
        "learning_time": 840,  # minutes
        "courses_completed": 3
    }

@router.get("/focus-trends")
async def get_focus_trends():
    """Get focus trends over time"""
    return {
        "daily_focus": [65, 70, 68, 75, 72, 78, 74],
        "weekly_average": 71.7
    }