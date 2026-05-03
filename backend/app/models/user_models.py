"""
SQLAlchemy ORM models for student auth and activity tracking.
"""
from sqlalchemy import Column, String, DateTime, Text, Integer
from sqlalchemy.sql import func
from app.db.database import Base


class Student(Base):
    """Registered ECE department student."""
    __tablename__ = "students"

    usn = Column(String(20), primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), nullable=True)
    password_hash = Column(String(255), nullable=False)
    registered_at = Column(DateTime(timezone=True), server_default=func.now())
    last_active = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class ActivityLog(Base):
    """Tracks student activity on the platform."""
    __tablename__ = "activity_logs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    usn = Column(String(20), index=True, nullable=False)
    action_type = Column(String(50), nullable=False)   # e.g. 'resume_analyze', 'roadmap_view', 'login'
    action_data = Column(Text, nullable=True)           # JSON string with extra details
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
