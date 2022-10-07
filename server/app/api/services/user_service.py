import os
from datetime import datetime, timedelta
from typing import Optional
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from app.db.db_setup import get_db

from app.db.models.user import User
from app.db.models.address import Address
from app.schemas.user import CreateUser, Token, TokenData, UserSchema
from app.schemas.address import AddressSchema

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")

def get_user(username: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return False
    address = db.query(Address).filter(User.address_id == user.address_id).one()
    return UserSchema(
        id=user.id, 
        username=user.username, 
        hashed_password=user.hashed_password, 
        email=user.email,
        first_name=user.first_name,
        last_name=user.last_name,
        birthdate=str(user.birthdate),
        address=AddressSchema(
            id=address.id,
            street1=address.street1,
            street2=address.street2,
            city=address.city,
            state=address.state,
            zip=address.zip
        )
        )

def authenticate_user(username: str, password: str, db: Session = Depends(get_db)):
    user = get_user(username=username, db=db)
    if not user:
        return False
    if not user.verify_password(plain_password=password, hashed_password=user.hashed_password):
        return False
    return user

def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(username=token_data.username, db=db)
    if user is None:
        raise credentials_exception
    return user


def get_user_by_email(email: str, db: Session = Depends(get_db)):
    return db.query(User).filter(User.email == email).first()


def get_users(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()


def create_user(user: CreateUser, db: Session = Depends(get_db)):
    password_hash = user.hash_password(user.password)
    db_user = User(
        username=user.username, 
        hashed_password=password_hash, 
        email=user.email,
        first_name=user.first_name,
        last_name=user.last_name,
        birthdate=user.birthdate,
        address_id=user.address_id
        )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user