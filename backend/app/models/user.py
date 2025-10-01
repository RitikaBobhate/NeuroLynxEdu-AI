"""
User model for PostgreSQL
"""
from sqlalchemy import Column, Integer, String, Boolean, DateTime, JSON, Float
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    avatar_url = Column(String, nullable=True)
    
    # Learning preferences
    learning_preferences = Column(JSON, default={})
    
    # EEG device info
    eeg_device_id = Column(String, nullable=True)
    eeg_device_connected = Column(Boolean, default=False)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_login = Column(DateTime, nullable=True)

class UserStats(Base):
    __tablename__ = "user_stats"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False, index=True)
    
    # Learning statistics
    total_courses = Column(Integer, default=0)
    completed_courses = Column(Integer, default=0)
    total_study_time = Column(Integer, default=0)  # in minutes
    learning_streak = Column(Integer, default=0)  # days
    
    # Focus and attention metrics
    avg_focus_level = Column(Float, default=0.0)
    avg_attention_level = Column(Float, default=0.0)
    total_ai_sessions = Column(Integer, default=0)
    
    # Performance metrics
    knowledge_mastery_score = Column(Float, default=0.0)
    learning_efficiency = Column(Float, default=0.0)
    
    # Timestamps
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)