# Cema Health Information System – Backend

This is the backend API for **Cema Health Information System**, built with **FastAPI** and **MongoDB**. It provides endpoints for managing **clients**, **health programs**, **enrollments**, and dashboard **analytics**.

---

## Tech Stack

- **FastAPI** – Modern Python web framework
- **MongoDB** – NoSQL document database
- **Motor** – Async MongoDB driver for Python
- **Pydantic** – Data validation and settings management
- **Uvicorn** – ASGI server
- **python-dotenv** – Environment variable loader

---

## Project Structure

```
backend/
├── app/
│   ├── db/
│   │   └── database.py          # MongoDB connection
│   ├── models/                  # MongoDB document structure
│   │   ├── client.py
│   │   ├── program.py
│   │   └── enrollment.py
│   ├── schemas/                 # Pydantic schemas
│   │   ├── client.py
│   │   ├── program.py
│   │   └── enrollment.py
│   ├── routes/                  # API routes
│   │   ├── client_routes.py
│   │   ├── program_routes.py
│   │   ├── enrollment_routes.py
│   │   └── dashboard_routes.py
│   └── main.py                  # Entry point
├── .env                         # MongoDB URI and other secrets
├── requirements.txt
└── README.md
```

---

## Setup Instructions

### 1. Clone the repo
```bash
git https://github.com/vincent-mugendi/cema-health-information-system.git
cd backend
```

### 2. Set up a virtual environment
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure your `.env`
Create a `.env` file in the `backend/` directory:
```
MONGODB_URL=mongodb://localhost:27017
DB_NAME=cema_db
```

### 5. Run the server
```bash
uvicorn app.main:app --reload
```

Visit your API docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## API Endpoints

| Method | Endpoint               | Description                    |
|--------|------------------------|--------------------------------|
| GET    | `/clients`             | Get all clients                |
| POST   | `/clients`             | Add new client                 |
| GET    | `/programs`            | Get all programs               |
| POST   | `/programs`            | Add new program                |
| GET    | `/enrollments`         | Get all enrollments            |
| POST   | `/enrollments`         | Add new enrollment             |
| GET    | `/dashboard/stats`     | Get dashboard analytics data   |

Explore all endpoints at: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)