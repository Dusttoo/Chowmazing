from pydantic import BaseModel
from passlib.context import CryptContext
from typing import Optional

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class CreateUser(BaseModel):
    username: str
    password: str
    email: str

    @classmethod
    def hash_password(self, password):
        return pwd_context.hash(password)

    class Config:
        orm_mode = True

class UserSchema(BaseModel):
    id: int
    username: str
    hashed_password: str
    email: str
    access_token: Optional[str]
    token_type: Optional[str]

    @classmethod
    def verify_password(self, plain_password, hashed_password):
        return pwd_context.verify(plain_password, hashed_password)
    
    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str 


class UserInDB(UserSchema):
    hashed_password: str