from pydantic import BaseModel
from typing import Optional, List

class ClientBase(BaseModel):
    name: str
    age: int
    gender: str

class ClientCreate(ClientBase):
    pass

class ClientOut(ClientBase):
    id: str
    enrolled_programs: Optional[List[str]] = []

    class Config:
        orm_mode = True


# Schema for client updates (used for PATCH requests)
class ClientUpdate(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    enrolled_programs: Optional[List[str]] = None  