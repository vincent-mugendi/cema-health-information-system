from fastapi import APIRouter, HTTPException
from app.schemas.client import ClientCreate, ClientOut
from typing import List
from uuid import uuid4

router = APIRouter(prefix="/clients", tags=["Clients"])

# TEMP mock DB
clients = []

@router.get("/", response_model=List[ClientOut])
async def get_clients():
    return clients

@router.get("/{client_id}", response_model=ClientOut)
async def get_client(client_id: str):
    for client in clients:
        if client["id"] == client_id:
            return client
    raise HTTPException(status_code=404, detail="Client not found")

@router.post("/", response_model=ClientOut)
async def create_client(client: ClientCreate):
    new_client = client.dict()
    new_client["id"] = str(uuid4())
    new_client["enrolled_programs"] = []
    clients.append(new_client)
    return new_client
