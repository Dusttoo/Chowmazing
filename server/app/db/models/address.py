from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from app.db.db_setup import Base

class Address(Base):
    __tablename__ = "addresses"

    id = Column(Integer, primary_key=True, index=True)
    street1 = Column(String(100), nullable=False)
    street2 = Column(String(100))
    city = Column(String(100), nullable=False)
    state = Column(String(100), nullable=False)
    zip = Column(Integer, nullable=False)

    user = relationship("User", back_populates="address")

    @classmethod
    def to_dict(self):
        return {
            'id': self.id,
            'street1': self.street1,
            'street2': self.street2,
            'city': self.city,
            'state': self.state,
            'zip': self.zip
        }
       
