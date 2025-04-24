from fastapi import APIRouter, HTTPException
from app.schemas.program import ProgramCreate, ProgramOut
from typing import List
from uuid import uuid4

router = APIRouter(prefix="/programs", tags=["Programs"])

programs = []

@router.get("/", response_model=List[ProgramOut])
async def get_programs():
    return programs

@router.post("/", response_model=ProgramOut)
async def create_program(program: ProgramCreate):
    new_program = program.dict()
    new_program["id"] = str(uuid4())
    programs.append(new_program)
    return new_program
