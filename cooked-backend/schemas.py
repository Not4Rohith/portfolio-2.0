from pydantic import BaseModel, EmailStr

class ContactDetails(BaseModel):
    email:EmailStr
    name:str
    message:str
    