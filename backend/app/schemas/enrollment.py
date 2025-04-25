from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID


class EnrollmentCreate(BaseModel):
    client_id: UUID
    program_id: UUID


class EnrollmentResponse(BaseModel):
    id: str
    client_id: UUID
    program_id: UUID
    message: Optional[str] = "Enrollment successful"
