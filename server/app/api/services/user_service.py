from sqlalchemy.orm import Session

from app.db.models.user import User
from app.schemas.user import CreateUser


def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()


def create_user(db: Session, user: CreateUser):
    password_hash = user.hash_password(user.password)
    db_user = User(
        username=user.username, hashed_password=password_hash, email=user.email
        )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user