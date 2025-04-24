from fastapi import APIRouter, HTTPException
from app.schemas.enrollment import Enrollment

router = APIRouter(prefix="/enrollments", tags=["Enrollments"])

enrollments = []

@router.post("/")
async def enroll_client(data: Enrollment):
    # Avoid duplicate enrollments
    for e in enrollments:
        if e["client_id"] == data.client_id and e["program_id"] == data.program_id:
            raise HTTPException(status_code=400, detail="Client already enrolled in this program")
    
    enrollments.append(data.dict())
    return {"message": "Enrollment successful"}
