"""
Auth service: student registration, login (JWT), and HOD authentication.

USN rules:
  - Format:  4MH23EC<NNN>  (N = digits)
  - Valid range: 4MH23EC001 – 4MH23EC125

Fixed student password for this batch: ece@25
HOD password: ecehod@25  (set in backend .env as HOD_PASSWORD)
"""
import os
import re
import json
from datetime import datetime, timedelta, timezone
from typing import Optional

from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.models.user_models import Student, ActivityLog

# ── Config ────────────────────────────────────────────────────────────────────
JWT_SECRET = os.getenv("JWT_SECRET", "nimma-mitra-ece-hub-secret-2025")
JWT_ALGORITHM = "HS256"
JWT_EXPIRE_HOURS = 24

HOD_PASSWORD = os.getenv("HOD_PASSWORD", "ecehod@25")
HOD_USERNAME = "hod"

STUDENT_PASSWORD = os.getenv("STUDENT_PASSWORD", "ece@25")

USN_PREFIX = "4MH23EC"
USN_MIN = 1
USN_MAX = 125

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

# ── USN Validation ─────────────────────────────────────────────────────────────

def validate_usn(usn: str) -> bool:
    """Returns True if USN is a valid 4MH23EC batch USN (001–125)."""
    usn = usn.strip().upper()
    pattern = rf"^{re.escape(USN_PREFIX)}(\d{{3}})$"
    match = re.match(pattern, usn)
    if not match:
        return False
    number = int(match.group(1))
    return USN_MIN <= number <= USN_MAX

def normalize_usn(usn: str) -> str:
    return usn.strip().upper()

# ── Password Helpers ───────────────────────────────────────────────────────────

def hash_password(plain: str) -> str:
    return pwd_context.hash(plain)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

# ── JWT Helpers ────────────────────────────────────────────────────────────────

def create_token(subject: str, role: str = "student") -> str:
    expire = datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRE_HOURS)
    payload = {"sub": subject, "role": role, "exp": expire}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def decode_token(token: str) -> dict:
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )

# ── Student Auth ───────────────────────────────────────────────────────────────

def register_student(usn: str, name: str, email: Optional[str], db: Session) -> dict:
    """Register a new ECE student. Returns JWT on success."""
    usn = normalize_usn(usn)

    if not validate_usn(usn):
        raise HTTPException(
            status_code=400,
            detail=f"Invalid USN. Must be in range {USN_PREFIX}001 – {USN_PREFIX}{USN_MAX:03d}",
        )

    existing = db.query(Student).filter(Student.usn == usn).first()
    if existing:
        raise HTTPException(status_code=409, detail="USN already registered. Please login.")

    student = Student(
        usn=usn,
        name=name.strip(),
        email=email.strip() if email else None,
        password_hash=hash_password(STUDENT_PASSWORD),
    )
    db.add(student)
    db.commit()
    db.refresh(student)

    # Log registration activity
    log_activity(usn, "register", {"name": name}, db)

    token = create_token(subject=usn, role="student")
    return {"token": token, "usn": usn, "name": name, "role": "student"}


def login_student(usn: str, password: str, db: Session) -> dict:
    """Login a student. Returns JWT on success."""
    usn = normalize_usn(usn)

    student = db.query(Student).filter(Student.usn == usn).first()
    if not student:
        raise HTTPException(status_code=404, detail="USN not registered. Please register first.")

    if not verify_password(password, student.password_hash):
        raise HTTPException(status_code=401, detail="Incorrect password.")

    # Update last active
    student.last_active = datetime.now(timezone.utc)
    db.commit()

    log_activity(usn, "login", {}, db)

    token = create_token(subject=usn, role="student")
    return {"token": token, "usn": usn, "name": student.name, "role": "student"}


def get_student_from_token(token: str, db: Session) -> Student:
    """Decode JWT and return the Student object."""
    payload = decode_token(token)
    usn = payload.get("sub")
    student = db.query(Student).filter(Student.usn == usn).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found.")
    return student

# ── HOD Auth ───────────────────────────────────────────────────────────────────

def login_hod(password: str) -> dict:
    """HOD login — password checked against env var."""
    if password != HOD_PASSWORD:
        raise HTTPException(status_code=401, detail="Incorrect HOD password.")
    token = create_token(subject=HOD_USERNAME, role="hod")
    return {"token": token, "role": "hod"}


def require_hod(token: str) -> dict:
    """Validate a HOD JWT token."""
    payload = decode_token(token)
    if payload.get("role") != "hod":
        raise HTTPException(status_code=403, detail="HOD access only.")
    return payload

# ── Activity Logging ───────────────────────────────────────────────────────────

def log_activity(usn: str, action_type: str, data: dict, db: Session):
    """Append an activity log entry for a student."""
    try:
        entry = ActivityLog(
            usn=usn,
            action_type=action_type,
            action_data=json.dumps(data),
        )
        db.add(entry)
        db.commit()
    except Exception:
        db.rollback()  # Never crash the main request because of logging

# ── HOD Queries ────────────────────────────────────────────────────────────────

def get_all_students(db: Session) -> list:
    students = db.query(Student).order_by(Student.registered_at.desc()).all()
    result = []
    for s in students:
        # Count activities
        activity_count = db.query(ActivityLog).filter(ActivityLog.usn == s.usn).count()
        result.append({
            "usn": s.usn,
            "name": s.name,
            "email": s.email,
            "registered_at": s.registered_at.isoformat() if s.registered_at else None,
            "last_active": s.last_active.isoformat() if s.last_active else None,
            "activity_count": activity_count,
        })
    return result


def get_student_activity(usn: str, db: Session) -> dict:
    """Full activity history for one student (for HOD detail view)."""
    usn = normalize_usn(usn)
    student = db.query(Student).filter(Student.usn == usn).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found.")

    logs = (
        db.query(ActivityLog)
        .filter(ActivityLog.usn == usn)
        .order_by(ActivityLog.timestamp.desc())
        .all()
    )

    parsed_logs = []
    for log in logs:
        try:
            data = json.loads(log.action_data) if log.action_data else {}
        except Exception:
            data = {}
        parsed_logs.append({
            "id": log.id,
            "action_type": log.action_type,
            "data": data,
            "timestamp": log.timestamp.isoformat() if log.timestamp else None,
        })

    return {
        "usn": student.usn,
        "name": student.name,
        "email": student.email,
        "registered_at": student.registered_at.isoformat() if student.registered_at else None,
        "last_active": student.last_active.isoformat() if student.last_active else None,
        "activities": parsed_logs,
    }
