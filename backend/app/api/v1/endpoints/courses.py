"""
Course management endpoints
"""
from fastapi import APIRouter, HTTPException
from typing import List

router = APIRouter()

# Mock courses data
mock_courses = [
    {
        "id": 1,
        "title": "Introduction to Machine Learning",
        "description": "Learn the basics of ML with EEG integration",
        "difficulty": "beginner",
        "rating": 4.5,
        "enrollment_count": 1250
    },
    {
        "id": 2,
        "title": "Advanced Neural Networks",
        "description": "Deep learning with real-time brain feedback",
        "difficulty": "advanced",
        "rating": 4.8,
        "enrollment_count": 320
    }
]

@router.get("/")
async def get_courses():
    """Get all available courses"""
    return mock_courses

@router.get("/{course_id}")
async def get_course(course_id: int):
    """Get a specific course by ID"""
    course = next((c for c in mock_courses if c["id"] == course_id), None)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

@router.post("/{course_id}/enroll")
async def enroll_in_course(course_id: int):
    """Enroll in a course"""
    course = next((c for c in mock_courses if c["id"] == course_id), None)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return {"message": f"Successfully enrolled in {course['title']}"}