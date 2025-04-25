from fastapi import APIRouter, HTTPException, Depends
from app.schemas.program import ProgramCreate, ProgramOut
from app.db.database import get_database  # Assuming this returns your db connection
from typing import List
from uuid import uuid4

router = APIRouter(prefix="/programs", tags=["Programs"])

# Fetch all programs
@router.get("/", response_model=List[ProgramOut])
async def get_programs(db=Depends(get_database)):
    programs_cursor = db["programs"].find()
    programs = []
    async for program in programs_cursor:
        programs.append(ProgramOut(**program))  # make sure _id is not used
    return programs

# Create a new program
@router.post("/", response_model=ProgramOut)
async def create_program(program: ProgramCreate, db=Depends(get_database)):
    new_program = program.dict()
    new_program["id"] = str(uuid4())  # Use UUID for the program id
    await db["programs"].insert_one(new_program)
    return ProgramOut(**new_program)

# Fetch clients for a specific program by program_id
@router.get("/{program_id}/clients")
async def get_clients_by_program_id(program_id: str, db=Depends(get_database)):
    # Query clients collection to find clients related to the program_id
    clients = await db["clients"].find({"program_id": program_id}).to_list(None)
    
    if not clients:
        raise HTTPException(status_code=404, detail="Clients not found for this program")
    
    return clients
