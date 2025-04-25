from fastapi import APIRouter, HTTPException, Depends
from app.schemas.program import ProgramCreate, ProgramOut
from app.db.database import get_database  # assuming this returns your db connection
from typing import List
from uuid import uuid4

router = APIRouter(prefix="/programs", tags=["Programs"])

@router.get("/", response_model=List[ProgramOut])
async def get_programs(db=Depends(get_database)):
    programs_cursor = db["programs"].find()
    programs = []
    async for program in programs_cursor:
        programs.append(ProgramOut(**program))  # make sure `_id` is not used
    return programs

@router.post("/", response_model=ProgramOut)
async def create_program(program: ProgramCreate, db=Depends(get_database)):
    new_program = program.dict()
    new_program["id"] = str(uuid4())
    await db["programs"].insert_one(new_program)
    return ProgramOut(**new_program)
