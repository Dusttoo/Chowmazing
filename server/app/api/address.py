import fastapi
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.db_setup import get_db
from app.db.models import Address
from app.schemas.address import AddressSchema, CreateAddress

address_router = fastapi.APIRouter()

@address_router.get('/', response_model=AddressSchema)
async def read_address(address_id: int, db: Session = Depends(get_db)):
    address = db.query(Address).filter(Address.id == address_id).one_or_none()
    if not address:
        return False
    else:
        return AddressSchema(
            id=address.id,
            street1=address.street1,
            street2=address.street2,
            city=address.city,
            state=address.state,
            zip=address.zip
        )

@address_router.post('/', response_model=AddressSchema)
async def create_address(address: CreateAddress, db: Session = Depends(get_db)):
    db_address = Address(
        street1=address.street1,
        street2=address.street2,
        city=address.city,
        state=address.state,
        zip=address.zip
    )
    db.add(db_address)
    db.commit()
    db.refresh(db_address)
    return db_address