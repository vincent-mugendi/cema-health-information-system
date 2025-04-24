# CEMA Health Information System – Frontend

**CEMA Health Information System** is a modern, modular healthcare information system designed to help healthcare providers manage client data, program enrollments, and visualize key health metrics. This frontend application is built using **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **shadcn/ui**, following best practices for scalability and maintainability.

---

## 🚀 Features

- Manage clients, health programs, and enrollments
- Interactive dashboard with real-time charts
- Integrated routing and state management
- Component-based design using `shadcn/ui`
- Custom healthcare-themed Tailwind styling
- API layer for easy backend integration

---

## 📦 Tech Stack

- **Framework:** React + Vite + TypeScript  
- **UI:** Tailwind CSS + shadcn/ui + lucide-react  
- **Routing:** React Router  
- **Data Handling:** @tanstack/react-query  
- **Charts:** Recharts  
- **Utilities:** clsx, tailwind-merge, date-fns  

---

## 🛠️ Getting Started

### 1. Prerequisites

Ensure the following are installed:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- npm or yarn

### 2. Clone & Install

```bash
git clone https://github.com/vincent-mugendi/cema-health-information-system.git
cd frontend
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🧱 Project Structure

```plaintext
src/
│
├── components/        # Reusable UI + layout components
│   ├── layout/        # MainLayout and sidebar
│   └── ui/            # shadcn/ui-based elements
│
├── pages/             # Dashboard, Clients, Programs, etc.
├── services/          # Mock API interactions
├── types/             # TypeScript interfaces
├── lib/               # Utility functions
├── App.tsx            # Main app with router setup
└── main.tsx           # App entry point
```

---

## 🎨 Custom Tailwind Theme

Custom colors for healthcare branding are defined in `tailwind.config.ts`:

```ts
colors: {
  "health-teal": "#14b8a6",
  "health-blue": "#0ea5e9",
  "health-indigo": "#6366f1",
  "health-light": "#f0fdfa",
}
```

---

## ⚙️ Key Scripts

| Script          | Purpose                       |
|-----------------|-------------------------------|
| `npm run dev`   | Run the development server    |
| `npm run build` | Build for production          |
| `npm run preview`| Preview production build     |
---

## 📝 License

MIT © 2025 - Vincent Mugendi - CEMA Internship Project
