# 🚀 Quick Start Guide - RTB Equipment Distribution System

## ✅ Prerequisites Check

Before starting, make sure you have:
- ✅ Node.js v18+ installed
- ✅ PostgreSQL installed and running
- ✅ npm installed

## 📦 Step 1: Install Dependencies

Both frontend and backend dependencies are already installed!

If you need to reinstall:
```bash
# Backend
cd backend
npm install

# Frontend  
cd frontend
npm install
```

## 🗄️ Step 2: Setup PostgreSQL Database

### Create the database:

**Option A - Using command line:**
```bash
createdb rtb_equipment
```

**Option B - Using psql:**
```bash
psql -U postgres
CREATE DATABASE rtb_equipment;
\q
```

### Update database credentials:

Edit `backend/.env` file (already exists) and update if needed:
```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/rtb_equipment
```

## 🔧 Step 3: Start Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
Database tables initialized
Server running on http://localhost:5000
```

## 👤 Step 4: Create Admin User

**Open a NEW terminal** (keep backend running) and run:

```bash
cd backend
npm run create-admin
```

You'll see:
```
Admin user created successfully!
Email: admin@rtb.gov.rw
Password: admin123
```

## 🎨 Step 5: Start Frontend

**Open another NEW terminal** and run:

```bash
cd frontend
npm run dev
```

You'll see:
```
VITE ready in XXX ms
➜  Local:   http://localhost:5173/
```

## 🌐 Step 6: Access the Application

1. Open your browser
2. Go to: `http://localhost:5173`
3. Login with:
   - **Email:** `admin@rtb.gov.rw`
   - **Password:** `admin123`

## 🎯 What You Can Do

1. **Login** - Use admin credentials
2. **Dashboard** - View system overview
3. **Add Employee** - Register new employees with laptop details
4. **View Employees** - See paginated list of all employees

## 📝 Test the System

1. Login to the system
2. Click "Add Employee"
3. Fill in the form with sample data:
   - First Name: Samanta
   - Last Name: ISHIMWE
   - National ID: 1200071091330
   - Phone: 0788888888
   - Email: samanta@rtb.gov.rw
   - Department: Human Resource
   - Position: Manager
   - Laptop Manufacturer: HP
   - Laptop Model: Envy
   - Laptop Serial: 3400
4. Submit and view in employee list

## 🔍 Verify Everything Works

### Check Backend:
```bash
curl http://localhost:5000/api/health
```
Should return: `{"status":"OK","message":"RTB Equipment Distribution API"}`

### Check Database:
```bash
psql -U postgres -d rtb_equipment -c "SELECT * FROM admins;"
```

## ⚠️ Troubleshooting

### Backend won't start:
- Check PostgreSQL is running: `pg_isready`
- Verify DATABASE_URL in `backend/.env`
- Check port 5000 is not in use

### Frontend won't start:
- Check port 5173 is not in use
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Can't login:
- Make sure you ran `npm run create-admin`
- Check backend console for errors
- Verify database has admin user: `psql -U postgres -d rtb_equipment -c "SELECT * FROM admins;"`

### CORS errors:
- Make sure backend is running on port 5000
- Check frontend is calling `http://localhost:5000/api`

## 📂 Project Structure

```
├── backend/
│   ├── src/
│   │   ├── config/database.ts      # Database setup
│   │   ├── middleware/auth.ts      # JWT authentication
│   │   ├── routes/auth.ts          # Login endpoint
│   │   ├── routes/employees.ts     # Employee CRUD
│   │   └── server.ts               # Express server
│   ├── scripts/createAdmin.ts      # Admin creation script
│   └── .env                        # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.tsx           # Login page
│   │   │   ├── Dashboard.tsx       # Dashboard
│   │   │   ├── EmployeeForm.tsx    # Add employee
│   │   │   └── EmployeeList.tsx    # View employees
│   │   ├── components/
│   │   │   └── PrivateRoute.tsx    # Route protection
│   │   ├── services/api.ts         # API client
│   │   └── App.tsx                 # Main app
│   └── package.json
│
└── README.md
```

## 🎉 You're All Set!

The system is now running and ready to use. Add employees and manage laptop distribution for RTB!
