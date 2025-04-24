from pydantic import BaseModel

class Enrollment(BaseModel):
    client_id: str
    program_id: str
