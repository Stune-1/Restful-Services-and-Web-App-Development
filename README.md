# RTB Equipment Distribution System

Full-stack application for managing laptop distribution to employees at Rwanda TVET Board.

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL
- **Authentication**: JWT

## Project Structure

```
├── frontend/          # React frontend
│   ├── src/
│   │   ├── pages/     # Login, Dashboard, EmployeeForm, EmployeeList
│   │   ├── components/
│   │   └── services/  # API client
│   └── package.json
│
├── backend/           # Node.js backend
│   ├── src/
│   │   ├── config/    # Database config
│   │   ├── routes/    # API routes
│   │   └── middleware/
│   └── package.json
│
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- PostgreSQL (v14+)
- npm or yarn

### 1. Database Setup

```bash
# Create PostgreSQL database
createdb rtb_equipment

# Or using psql
psql -U postgres
CREATE DATABASE rtb_equipment;
\q
```

Update `backend/.env` with your database credentials:
```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/rtb_equipment
```

### 2. Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Create Admin User

```bash
cd backend
npx tsx scripts/createAdmin.ts
```

Default credentials:
- Email: `admin@rtb.gov.rw`
- Password: `admin123`

### 4. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

## Features

✅ JWT Authentication  
✅ Protected Routes  
✅ Employee Registration Form  
✅ Paginated Employee List  
✅ Responsive Design  
✅ Input Validation  
✅ Error Handling  
✅ CORS Protection  

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login

### Employees (Protected)
- `POST /api/employees` - Create employee
- `GET /api/employees?page=1&limit=10` - Get employees (paginated)

## Usage

1. Start PostgreSQL
2. Run backend: `cd backend && npm run dev`
3. Run frontend: `cd frontend && npm run dev`
4. Open browser: `http://localhost:5173`
5. Login with admin credentials
6. Add employees and view the list

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Input validation
- SQL injection prevention
- CORS configuration

## Next Steps

- [ ] Add Swagger documentation
- [ ] Add employee edit/delete functionality
- [ ] Add search and filter
- [ ] Add export to CSV/PDF
- [ ] Deploy to production
