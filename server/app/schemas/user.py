from pydantic import BaseModel
from passlib.context import CryptContext

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

class User(BaseModel):
    id: int
    username: str
    hashed_password: str
    email: str

    @classmethod
    def verify_password(self, plain_password):
        return pwd_context.verify(plain_password, self.hashed_password)
    
    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class UserInDB(User):
    hashed_password: str