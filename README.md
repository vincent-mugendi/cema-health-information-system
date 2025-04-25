# CEMA Health Information System – Full Stack

**CEMA Health Information System** is a comprehensive healthcare solution that enables healthcare providers to manage client data, program enrollments, and visualize health metrics efficiently. It is built using a modern, modular architecture with a frontend and backend that work seamlessly together.

This repository contains both the **Frontend** and **Backend** parts of the system, which are detailed below.

---

## 🌐 Explore the App

You can explore the deployed version of the CEMA Health Information System here:  
👉 [**Live Demo on Vercel**](https://vercel.com/vincent-mugendis-projects/cema-health-information-system-prod)

Use this version to test the user interface and get a feel for how client and program management works in real-time.

---

**CEMA Health Information System** is a comprehensive healthcare solution that enables healthcare providers to manage client data, program enrollments, and visualize health metrics efficiently. It is built using a modern, modular architecture with a frontend and backend that work seamlessly together.

This repository contains both the **Frontend** and **Backend** parts of the system, which are detailed below.


## 🚀 Features

- **Frontend:**
  - Client, health program, and enrollment management
  - Interactive dashboard with real-time charts
  - Custom healthcare-themed UI using Tailwind CSS and shadcn/ui
  - API layer integration for seamless backend communication
- **Backend:**
  - API endpoints for managing clients, health programs, and enrollments
  - MongoDB integration for data storage
  - FastAPI-based backend with asynchronous operations
  - API documentation available for easy exploration

---

## 📦 Tech Stack

### Frontend
- **Framework:** React + Vite + TypeScript
- **UI:** Tailwind CSS + shadcn/ui + lucide-react
- **Routing:** React Router
- **Data Handling:** @tanstack/react-query
- **Charts:** Recharts
- **Utilities:** clsx, tailwind-merge, date-fns

### Backend
- **Framework:** FastAPI
- **Database:** MongoDB (using Motor for async operations)
- **Validation:** Pydantic
- **Server:** Uvicorn (ASGI server)
- **Environment:** python-dotenv for environment variable management

---

## 🛠️ Getting Started

### 1. Prerequisites

Ensure the following are installed:
- [Node.js](https://nodejs.org/) (v18+ recommended) – for the frontend
- [Python 3.12+](https://www.python.org/downloads/) – for the backend
- npm or yarn (for frontend) and pip (for backend)

### 2. Clone & Install

```bash
git clone https://github.com/vincent-mugendi/cema-health-information-system.git
```

#### For Frontend:
```bash
cd frontend
npm install
```

#### For Backend:
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

---

## ⚙️ Running the Project

### Frontend

1. Run the development server:
   ```bash
   npm run dev
   ```
2. Visit `http://localhost:5173` in your browser.

### Backend

1. Configure your `.env` file in the `backend/` directory:
   ```
   MONGODB_URL=mongodb://localhost:27017
   DB_NAME=cema_db
   ```
2. Run the FastAPI server:
   ```bash
   uvicorn app.main:app --reload
   ```
3. Visit the API docs at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## 🧱 Project Structure

### Frontend

```plaintext
frontend/
├── components/        # Reusable UI + layout components
│   ├── layout/        # MainLayout and sidebar
│   └── ui/            # shadcn/ui-based elements
├── pages/             # Dashboard, Clients, Programs, etc.
├── services/          # Mock API interactions
├── types/             # TypeScript interfaces
├── lib/               # Utility functions
├── App.tsx            # Main app with router setup
└── main.tsx           # App entry point
```

### Backend

```plaintext
backend/
├── app/
│   ├── db/            # MongoDB connection
│   ├── models/        # MongoDB document structure
│   ├── schemas/       # Pydantic schemas for validation
│   ├── routes/        # API route handlers
│   └── main.py        # Application entry point
├── .env               # MongoDB URI and other secrets
├── requirements.txt   # Project dependencies
└── README.md          # Project documentation
```

---

## 📚 API Endpoints (Backend)

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

---

## ⚙️ Key Scripts

### Frontend

| Script          | Purpose                       |
|-----------------|-------------------------------|
| `npm run dev`   | Run the development server    |
| `npm run build` | Build for production          |
| `npm run preview`| Preview production build     |

### Backend

| Script           | Purpose                       |
|------------------|-------------------------------|
| `uvicorn`        | Run the FastAPI development server |

---

## 📝 License

MIT © 2025 - Vincent Mugendi - CEMA Internship Project
