from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import client_routes, program_routes, enrollment_routes, dashboard_routes

# Create FastAPI app
app = FastAPI()

# Enable CORS for your React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # URL of your React dev server
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Include routers for different routes
app.include_router(client_routes.router)
app.include_router(program_routes.router)
app.include_router(enrollment_routes.router)
app.include_router(dashboard_routes.router)

# Root endpoint
@app.get("/")
async def root():
    return {"message": "CEMA Health API running 🚀"}
