from sqlalchemy import Column, Integer, ForeignKey, String, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.db_setup import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    hashed_password = Column(String(30), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    username = Column(String(100), unique=True, nullable=False)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    address_id = Column(Integer, ForeignKey("addresses.id"), nullable=False)
    birthdate = Column(DateTime(), nullable=False)
    # created_at = Column(DateTime(timezone=True), server_default=func.now())
    # updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    address = relationship("Address", back_populates="user")

    @classmethod
    def to_dict(self):
        return {
            'id': self.id,
            'hashed_password': self.hashed_password,
            'email': self.email,
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'birthdate': self.birthdate,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
       
