from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.db.database import get_database

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/stats")
async def get_dashboard_stats(db: AsyncIOMotorDatabase = Depends(get_database)):
    total_clients = await db.clients.count_documents({})
    total_programs = await db.programs.count_documents({})
    total_enrollments = await db.enrollments.count_documents({})

    pipeline = [
        {
            "$group": {
                "_id": "$program_id",
                "count": {"$sum": 1}
            }
        },
        {
            "$addFields": {
                "program_id_str": {"$toString": "$_id"}
            }
        },
        {
            "$lookup": {
                "from": "programs",
                "localField": "program_id_str",
                "foreignField": "id",
                "as": "program"
            }
        },
        {
            "$unwind": "$program"
        },
        {
            "$project": {
                "program": "$program.name",
                "count": 1
            }
        }
    ]

    program_stats = await db.enrollments.aggregate(pipeline).to_list(length=None)

    return {
        "total_clients": total_clients,
        "total_programs": total_programs,
        "total_enrollments": total_enrollments,
        "program_stats": program_stats
    }
