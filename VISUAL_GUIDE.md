# 🎨 Visual Guide - RTB Equipment Distribution System

## 🖥️ Application Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     USER JOURNEY                             │
└─────────────────────────────────────────────────────────────┘

1. LOGIN PAGE (http://localhost:5173/login)
   ┌──────────────────────────────────────┐
   │  RTB Equipment System                │
   │  ┌────────────────────────────────┐  │
   │  │ Email: admin@rtb.gov.rw        │  │
   │  └────────────────────────────────┘  │
   │  ┌────────────────────────────────┐  │
   │  │ Password: ••••••••             │  │
   │  └────────────────────────────────┘  │
   │  ┌────────────────────────────────┐  │
   │  │         LOGIN                  │  │
   │  └────────────────────────────────┘  │
   └──────────────────────────────────────┘
                    ↓
                [JWT Token]
                    ↓

2. DASHBOARD (http://localhost:5173/dashboard)
   ┌──────────────────────────────────────┐
   │  RTB Equipment Distribution System   │
   │                          [Logout]    │
   │  ┌────────────┐  ┌────────────────┐ │
   │  │ Add        │  │ View           │ │
   │  │ Employee   │  │ Employees      │ │
   │  │            │  │                │ │
   │  └────────────┘  └────────────────┘ │
   └──────────────────────────────────────┘
           ↓                    ↓
           ↓                    ↓

3a. ADD EMPLOYEE                3b. VIEW EMPLOYEES
   ┌──────────────────┐            ┌─────────────────────────┐
   │ Register New     │            │ Employee List  [+Add]   │
   │ Employee         │            │ ┌─────┬──────┬────────┐ │
   │ ┌──────────────┐ │            │ │ ID  │ Name │ Laptop │ │
   │ │ First Name   │ │            │ ├─────┼──────┼────────┤ │
   │ │ Last Name    │ │            │ │ 101 │ Sam  │ HP     │ │
   │ │ National ID  │ │            │ │ 102 │ John │ Dell   │ │
   │ │ Phone        │ │            │ └─────┴──────┴────────┘ │
   │ │ Email        │ │            │ [1] [2] [3] [Next]      │
   │ │ Department   │ │            └─────────────────────────┘
   │ │ Position     │ │
   │ │ Laptop Make  │ │
   │ │ Laptop Model │ │
   │ │ Serial No.   │ │
   │ └──────────────┘ │
   │ [Register]       │
   └──────────────────┘
```

## 🔄 Data Flow

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│   FRONTEND   │ ◄────► │   BACKEND    │ ◄────► │  DATABASE    │
│  React App   │  HTTP  │  Express API │   SQL  │  PostgreSQL  │
│  Port: 5173  │  REST  │  Port: 5000  │        │  Port: 5432  │
└──────────────┘         └──────────────┘         └──────────────┘
      │                        │                        │
      │ 1. POST /auth/login    │                        │
      │ ─────────────────────> │                        │
      │                        │ 2. Query admins table  │
      │                        │ ─────────────────────> │
      │                        │ 3. Return admin data   │
      │                        │ <───────────────────── │
      │ 4. Return JWT token    │                        │
      │ <───────────────────── │                        │
      │                        │                        │
      │ 5. POST /employees     │                        │
      │    + JWT token         │                        │
      │ ─────────────────────> │                        │
      │                        │ 6. Verify JWT          │
      │                        │ 7. Insert employee     │
      │                        │ ─────────────────────> │
      │                        │ 8. Return new employee │
      │                        │ <───────────────────── │
      │ 9. Return success      │                        │
      │ <───────────────────── │                        │
```

## 🗄️ Database Structure

```
┌─────────────────────────────────────────────────────────────┐
│                      DATABASE: rtb_equipment                 │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────┐         ┌──────────────────────────┐
│   admins             │         │   employees              │
├──────────────────────┤         ├──────────────────────────┤
│ id (PK)              │         │ id (PK)                  │
│ email (UNIQUE)       │         │ first_name               │
│ password (HASHED)    │         │ last_name                │
│ created_at           │         │ national_id (UNIQUE)     │
└──────────────────────┘         │ telephone                │
                                 │ email (UNIQUE)           │
                                 │ department               │
                                 │ position                 │
                                 │ laptop_manufacturer      │
                                 │ laptop_model             │
                                 │ laptop_serial (UNIQUE)   │
                                 │ created_at               │
                                 └──────────────────────────┘
```

## 📂 File Structure

```
RTB Equipment System
│
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 pages/
│   │   │   ├── 📄 Login.tsx           ← Login page
│   │   │   ├── 📄 Dashboard.tsx       ← Main dashboard
│   │   │   ├── 📄 EmployeeForm.tsx    ← Add employee
│   │   │   └── 📄 EmployeeList.tsx    ← View employees
│   │   ├── 📁 components/
│   │   │   └── 📄 PrivateRoute.tsx    ← Route protection
│   │   ├── 📁 services/
│   │   │   └── 📄 api.ts              ← API client
│   │   ├── 📄 App.tsx                 ← Main app
│   │   ├── 📄 App.css                 ← Styles
│   │   └── 📄 main.tsx                ← Entry point
│   └── 📄 package.json
│
├── 📁 backend/
│   ├── 📁 src/
│   │   ├── 📁 config/
│   │   │   └── 📄 database.ts         ← DB setup
│   │   ├── 📁 middleware/
│   │   │   └── 📄 auth.ts             ← JWT auth
│   │   ├── 📁 routes/
│   │   │   ├── 📄 auth.ts             ← Login route
│   │   │   └── 📄 employees.ts        ← Employee routes
│   │   └── 📄 server.ts               ← Express server
│   ├── 📁 scripts/
│   │   └── 📄 createAdmin.ts          ← Create admin
│   ├── 📄 .env                        ← Config
│   └── 📄 package.json
│
└── 📄 Documentation files
```

## 🎯 Component Hierarchy

```
App
├── Router
    ├── /login
    │   └── Login
    │       ├── Form
    │       └── Error Display
    │
    ├── /dashboard (Protected)
    │   └── Dashboard
    │       ├── Header
    │       ├── Navigation Cards
    │       └── Logout Button
    │
    ├── /employees/new (Protected)
    │   └── EmployeeForm
    │       ├── Form Fields (11)
    │       ├── Validation
    │       └── Submit Button
    │
    └── /employees (Protected)
        └── EmployeeList
            ├── Table
            ├── Pagination
            └── Navigation
```

## 🔐 Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                   AUTHENTICATION FLOW                        │
└─────────────────────────────────────────────────────────────┘

1. User enters credentials
   ↓
2. Frontend sends POST /auth/login
   ↓
3. Backend validates credentials
   ↓
4. Backend generates JWT token
   ↓
5. Frontend stores token in localStorage
   ↓
6. Frontend redirects to dashboard
   ↓
7. For protected routes:
   - Frontend checks if token exists
   - If yes: Allow access
   - If no: Redirect to login
   ↓
8. For API calls:
   - Frontend includes token in Authorization header
   - Backend verifies token
   - If valid: Process request
   - If invalid: Return 401 Unauthorized
```

## 📊 API Request/Response Examples

### Login Request
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@rtb.gov.rw",
  "password": "admin123"
}

↓ Response ↓

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Login successful"
}
```

### Create Employee Request
```
POST http://localhost:5000/api/employees
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "firstName": "Samanta",
  "lastName": "ISHIMWE",
  "nationalId": "1200071091330",
  "telephone": "0788888888",
  "email": "samanta@rtb.gov.rw",
  "department": "Human Resource",
  "position": "Manager",
  "laptopManufacturer": "HP",
  "laptopModel": "Envy",
  "laptopSerial": "3400"
}

↓ Response ↓

{
  "data": { ... employee object ... },
  "message": "Employee created successfully"
}
```

## 🎨 Color Scheme

```
Primary Colors:
├── Blue:    #2563eb (buttons, links)
├── Gray:    #6b7280 (secondary buttons)
└── White:   #ffffff (backgrounds)

Text Colors:
├── Dark:    #1f2937 (headings)
├── Medium:  #374151 (labels)
└── Light:   #6b7280 (descriptions)

Status Colors:
├── Success: #16a34a (green)
├── Error:   #dc2626 (red)
└── Info:    #3b82f6 (blue)
```

## 📱 Responsive Breakpoints

```
Mobile:     < 768px
Tablet:     768px - 1024px
Desktop:    > 1024px

Grid Layout:
- Mobile:   1 column
- Tablet:   2 columns
- Desktop:  2-3 columns
```

## 🚀 Deployment Checklist

```
□ Update .env with production values
□ Set NODE_ENV=production
□ Update CORS origins
□ Use strong JWT_SECRET
□ Setup production database
□ Build frontend: npm run build
□ Build backend: npm run build
□ Setup reverse proxy (nginx)
□ Enable HTTPS
□ Setup monitoring
□ Configure backups
```

---

This visual guide provides a clear overview of the system architecture, data flow, and component structure!
