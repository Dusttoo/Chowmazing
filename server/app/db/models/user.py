from sqlalchemy import Column, Integer, String

from app.db.db_setup import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    hashed_password = Column(String(30), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    username = Column(String(100), unique=True, nullable=False)

    @classmethod
    def to_dict(self):
        return {
            'id': self.id,
            'hashed_password': self.hashed_password,
            'email': self.email,
            'username': self.username
        }
       
