# RTB Equipment Distribution System

Modern full-stack app for managing laptop distribution to employees at Rwanda TVET Board.

## ✨ Features

- 🔐 JWT Authentication
- ➕ Add Employees (11 fields)
- 📋 View Employees (Paginated)
- ✏️ Edit Employees
- 🗑️ Delete Employees
- 🎨 Modern, Responsive UI
- 🔒 Protected Routes
- ✅ Input Validation

## 🚀 Quick Setup

### 1. Create Database
```bash
createdb -U postgres rtb_equipment
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

## 🎯 What You Can Do

1. **Login** - Secure authentication with JWT
2. **Dashboard** - Overview and quick navigation
3. **Add Employee** - Register new employees with laptop details
4. **View Employees** - Paginated list with search
5. **Edit Employee** - Update employee information
6. **Delete Employee** - Remove employee records

## 🛠️ Tech Stack

**Frontend:**
- React 19 + TypeScript
- Vite 8
- React Router DOM
- Axios
- Modern CSS with Gradients

**Backend:**
- Node.js + Express
- TypeScript
- PostgreSQL
- JWT Authentication
- bcryptjs

## 📡 API Endpoints

- `POST /api/auth/login` - Login
- `POST /api/employees` - Create employee
- `GET /api/employees` - Get all employees (paginated)
- `GET /api/employees/:id` - Get single employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

All endpoints except login require JWT token.

## 🎨 UI Features

- Beautiful gradient design
- Smooth animations
- Responsive layout
- Modal dialogs
- Loading states
- Error handling
- Success notifications
- Hover effects
- Modern card layouts

## 📁 Project Structure

```
├── frontend/
│   └── src/
│       ├── pages/          # Login, Dashboard, EmployeeForm, EmployeeList
│       ├── components/     # PrivateRoute, EditEmployeeModal
│       └── services/       # API client
│
└── backend/
    └── src/
        ├── config/         # Database
        ├── middleware/     # Auth
        ├── routes/         # API routes
        └── server.ts       # Express server
```

## 🔒 Security

- Password hashing with bcrypt
- JWT token authentication (24h expiration)
- Protected API routes
- CORS configuration
- SQL injection prevention
- Input validation

---

Built with ❤️ for Rwanda TVET Board
