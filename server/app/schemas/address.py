from pydantic import BaseModel
from typing import Optional

class CreateAddress(BaseModel):
    street1: str
    street2: Optional[str]
    city: str
    state: str
    zip: int

    class Config:
        orm_mode = True

class AddressSchema(BaseModel):
    id: int
    street1: str
    street2: Optional[str]
    city: str
    state: str
    zip: int

    class Config:
        orm_mode = True