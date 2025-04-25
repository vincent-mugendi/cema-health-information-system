from fastapi import APIRouter, HTTPException
from app.schemas.client import ClientCreate, ClientOut
from typing import List
from uuid import uuid4
from app.db.database import db

router = APIRouter(prefix="/clients", tags=["Clients"])

def mongo_to_client_out(client) -> dict:
    # Convert MongoDB document to match ClientOut schema
    return {
        "id": client.get("id", str(client["_id"])),  # Prefer `id`, fallback to `_id`
        "name": client["name"],
        "age": client["age"],
        "gender": client["gender"],
        "enrolled_programs": client.get("enrolled_programs", []),
    }

@router.get("/", response_model=List[ClientOut])
async def get_clients():
    clients = []
    async for client in db["clients"].find():
        clients.append(mongo_to_client_out(client))
    return clients

@router.get("/{client_id}", response_model=ClientOut)
async def get_client(client_id: str):
    client = await db["clients"].find_one({"id": client_id})
    if client:
        return mongo_to_client_out(client)
    raise HTTPException(status_code=404, detail="Client not found")

@router.post("/", response_model=ClientOut)
async def create_client(client: ClientCreate):
    new_client = client.dict()
    new_client["id"] = str(uuid4())  # Custom UUID-based id
    new_client["enrolled_programs"] = []
    await db["clients"].insert_one(new_client)
    return new_client
