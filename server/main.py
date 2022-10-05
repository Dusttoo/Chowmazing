import os
import databases
import sqlalchemy
from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

database = databases.Database(DATABASE_URL)

metadata = sqlalchemy.MetaData()

users = sqlalchemy.Table(
    "users",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("username", sqlalchemy.String),
    sqlalchemy.Column("hashed_password", sqlalchemy.String),
    sqlalchemy.Column("email", sqlalchemy.String),
)

engine = sqlalchemy.create_engine(
    DATABASE_URL
)
# metadata.create_all(engine)

class CreateUser(BaseModel):
    username: str
    hashed_password: str
    email: str

class User(BaseModel):
    id: int
    username: str
    hashed_password: str
    email: str

app = FastAPI()

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

@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/users/", response_model=List[User])
async def get_users():
    query = users.select()
    return await database.fetch_all(query)

@app.post("/users/", response_model=User)
async def create_user(user: CreateUser):
    print(user)
    query = users.insert().values(username=user.username, hashed_password=user.hashed_password, email=user.email)
    last_record_id = await database.execute(query)
    return {**user.dict(), "id": last_record_id}