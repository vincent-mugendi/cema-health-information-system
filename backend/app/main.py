from fastapi import FastAPI
from app.routes import client_routes, program_routes, enrollment_routes

app = FastAPI()

app.include_router(client_routes.router)
app.include_router(program_routes.router)
app.include_router(enrollment_routes.router)

@app.get("/")
async def root():
    return {"message": "CEMA Health API running 🚀"}
