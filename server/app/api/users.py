import os
from typing import List
from datetime import datetime, timedelta


import fastapi
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from app.db.db_setup import get_db
from app.schemas.user import CreateUser, UserSchema, CreateUser, Token
from app.api.services.user_service import get_user, get_user_by_email, get_users, create_user, authenticate_user, create_access_token, get_current_user


user_router = fastapi.APIRouter()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")

@user_router.get("/", response_model=List[UserSchema])
async def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = get_users(db, skip=skip, limit=limit)
    return users


@user_router.post("/", response_model=UserSchema, status_code=201)
async def create_new_user(user: CreateUser, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db=db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email is already registered")
    created_user = create_user(db=db, user=user)
    access_token_expires = timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))
    access_token = create_access_token(
        data={"sub": created_user.username}, expires_delta=access_token_expires
    )
    return {
        "id": created_user.id,
        "username": created_user.username, 
        "hashed_password": created_user.hashed_password, 
        "email": created_user.email, 
        "first_name": created_user.first_name,
        "last_name": created_user.last_name,
        "birthdate": str(created_user.birthdate),
        "access_token": access_token, 
        "token_type" : 'bearer',
        "address_id": created_user.address_id
    }


@user_router.get("/{username}", response_model=UserSchema)
async def read_user(username: str, db: Session = Depends(get_db)):
    db_user = get_user(db, username)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@user_router.post("/token", response_model=Token)
async def login_for_access_token(db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(db=db, username=form_data.username, password=form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@user_router.get("/me/", response_model=UserSchema)
async def read_users_me(current_user: UserSchema = Depends(get_current_user)):
    return current_user