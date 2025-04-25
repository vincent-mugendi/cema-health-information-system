from fastapi import APIRouter, HTTPException
from app.schemas.client import ClientCreate, ClientUpdate, ClientOut
from typing import List
from uuid import uuid4
from app.db.database import db  # Make sure to have your MongoDB connection

router = APIRouter(prefix="/clients", tags=["Clients"])

# Helper function to convert MongoDB data to ClientOut format
def mongo_to_client_out(client) -> dict:
    return {
        "id": client.get("id", str(client["_id"])),
        "name": client["name"],
        "age": client["age"],
        "gender": client["gender"],
        "enrolled_programs": client.get("enrolled_programs", []),
    }

# Endpoint to fetch all clients
@router.get("/", response_model=List[ClientOut])
async def get_clients():
    clients = []
    async for client in db["clients"].find():
        clients.append(mongo_to_client_out(client))
    return clients

# Endpoint to fetch a single client by ID
@router.get("/{client_id}", response_model=ClientOut)
async def get_client(client_id: str):
    client = await db["clients"].find_one({"id": client_id})
    if client:
        return mongo_to_client_out(client)
    raise HTTPException(status_code=404, detail="Client not found")

# Endpoint to create a new client
@router.post("/", response_model=ClientOut)
async def create_client(client: ClientCreate):
    new_client = client.dict()
    new_client["id"] = str(uuid4())
    await db["clients"].insert_one(new_client)
    return mongo_to_client_out(new_client)

# Endpoint to update client information (PATCH)
@router.patch("/{client_id}", response_model=ClientOut)
async def update_client(client_id: str, client_data: ClientUpdate):
    # Find the client by id
    client = await db["clients"].find_one({"id": client_id})
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")

    # Update the fields in the client document
    updated_data = client_data.dict(exclude_unset=True)
    if updated_data.get("enrolled_programs"):
        # Ensure that enrolled_programs is handled properly
        updated_data["enrolled_programs"] = updated_data["enrolled_programs"]
    
    # Perform the update
    await db["clients"].update_one({"id": client_id}, {"$set": updated_data})

    # Fetch the updated client document
    updated_client = await db["clients"].find_one({"id": client_id})
    return mongo_to_client_out(updated_client)
