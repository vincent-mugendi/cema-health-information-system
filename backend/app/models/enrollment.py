from datetime import datetime
from typing import Any
from uuid import UUID
from motor.motor_asyncio import AsyncIOMotorCollection

def enrollment_helper(enrollment: dict) -> dict:
    return {
        "id": str(enrollment["_id"]),
        "client_id": enrollment["client_id"],
        "program_id": enrollment["program_id"],
        "created_at": enrollment["created_at"],
    }

class EnrollmentModel:
    def __init__(self, db: AsyncIOMotorCollection):
        self.collection = db

    async def create_enrollment(self, client_id: UUID, program_id: UUID) -> dict:
        # Check if the client is already enrolled in this program
        existing = await self.collection.find_one({
            "client_id": str(client_id),
            "program_id": str(program_id)
        })
        if existing:
            raise ValueError("Client already enrolled in this program")

        # Create the enrollment record
        enrollment = {
            "client_id": str(client_id),
            "program_id": str(program_id),
            "created_at": datetime.utcnow(),
        }
        result = await self.collection.insert_one(enrollment)
        enrollment["_id"] = result.inserted_id
        return enrollment_helper(enrollment)

    async def get_all_enrollments(self) -> list:
        enrollments = []
        async for enrollment in self.collection.find():
            enrollments.append(enrollment_helper(enrollment))
        return enrollments
