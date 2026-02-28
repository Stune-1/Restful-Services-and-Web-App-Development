# RTB Equipment Distribution System

Full-stack app for managing laptop distribution to employees at Rwanda TVET Board.

## Tech Stack

- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express + TypeScript
- Database: PostgreSQL

## Quick Setup

### 1. Create Database
```bash
createdb rtb_equipment
```

### 2. Install & Start Backend
```bash
cd backend
npm install
npm run dev
```

### 3. Create Admin User (in new terminal)
```bash
cd backend
npm run create-admin
```

Default credentials:
- Email: `admin@rtb.gov.rw`
- Password: `admin123`

### 4. Install & Start Frontend (in new terminal)
```bash
cd frontend
npm install
npm run dev
```

### 5. Open Browser
Go to `http://localhost:5173` and login!

## Features

- JWT Authentication
- Employee Registration (11 fields)
- Paginated Employee List
- Responsive Design
- Input Validation
- Protected Routes

## API Endpoints

- `POST /api/auth/login` - Login
- `POST /api/employees` - Create employee (protected)
- `GET /api/employees?page=1&limit=10` - Get employees (protected)

## Project Structure

```
├── frontend/
│   └── src/
│       ├── pages/          # Login, Dashboard, EmployeeForm, EmployeeList
│       ├── components/     # PrivateRoute
│       └── services/       # API client
│
└── backend/
    └── src/
        ├── config/         # Database
        ├── middleware/     # Auth
        ├── routes/         # API routes
        └── server.ts       # Express server
```

That's it! Simple and clean.
