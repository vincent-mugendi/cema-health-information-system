from fastapi import APIRouter, HTTPException, Depends
from uuid import UUID
from app.db.database import get_database  # Async DB connection
from app.schemas.enrollment import EnrollmentCreate, EnrollmentResponse
from app.models.enrollment import EnrollmentModel
from fastapi.responses import JSONResponse

router = APIRouter()

@router.post("/enrollments", response_model=EnrollmentResponse)
async def enroll_client(enrollment: EnrollmentCreate, db=Depends(get_database)):
    enrollment_model = EnrollmentModel(db["enrollments"])
    try:
        # Create the enrollment in the database
        enrollment_data = await enrollment_model.create_enrollment(
            client_id=enrollment.client_id,
            program_id=enrollment.program_id
        )
        
        # Check if the enrollment data is empty or invalid
        if not enrollment_data:
            raise HTTPException(status_code=400, detail="Enrollment creation failed.")
        
        # Return a successful JSON response with status 200
        return JSONResponse(status_code=200, content={
            "id": enrollment_data["id"],
            "client_id": enrollment_data["client_id"],
            "program_id": enrollment_data["program_id"],
            "message": "Client successfully enrolled."
        })

    except ValueError as e:
        # Handle known exceptions (like validation issues) and return 400
        raise HTTPException(status_code=400, detail=str(e))
    
    except Exception as e:
        # Handle unexpected errors and log them if necessary
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/enrollments", response_model=list[EnrollmentResponse])
async def get_enrollments(db=Depends(get_database)):
    enrollment_model = EnrollmentModel(db["enrollments"])
    
    try:
        # Fetch all enrollments from the database
        enrollments = await enrollment_model.get_all_enrollments()
        
        # If no enrollments are found, return an empty list
        if not enrollments:
            return []
        
        # Return the list of enrollments as a JSON response
        return enrollments
    
    except Exception as e:
        # If something goes wrong, handle it and return a 500 status code
        raise HTTPException(status_code=500, detail="Internal server error")
