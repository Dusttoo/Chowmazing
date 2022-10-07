import os
import databases
import sqlalchemy
from typing import List
from fastapi import FastAPI
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from fastapi_sqlalchemy import DBSessionMiddleware
from fastapi_pagination import add_pagination


from app.db.db_setup import Base, engine
from app.api.users import user_router
from app.api.address import address_router

load_dotenv()

metadata = sqlalchemy.MetaData()
Base.metadata.create_all(bind=engine)

DATABASE_URL = os.getenv("DATABASE_URL")

database = databases.Database(DATABASE_URL)

app = FastAPI(
    title="Chowmazing",
    description="Don't know what to eat? We can fix that.",
    version="0.0.1",
    contact={"name": "Dusty Mumphrey", "email": "dusty.mumphrey@gmail.com"},
    license_info={"name": "Chowmazing"},
)


origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

app.include_router(user_router, prefix="/users")
app.include_router(address_router, prefix='/address')
add_pagination(app)