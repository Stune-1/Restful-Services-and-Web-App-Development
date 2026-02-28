# Quick Setup Guide

## 1. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend (in new terminal)
cd frontend
npm install
```

## 2. Setup PostgreSQL Database

```bash
# Create database
createdb rtb_equipment

# Or if you need to specify user
createdb -U postgres rtb_equipment
```

## 3. Configure Environment

Edit `backend/.env` with your database password:
```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/rtb_equipment
```

## 4. Start Backend

```bash
cd backend
npm run dev
```

Wait for "Database tables initialized" message.

## 5. Create Admin User

In a new terminal:
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

## 6. Start Frontend

In a new terminal:
```bash
cd frontend
npm run dev
```

## 7. Access Application

Open browser: `http://localhost:5173`

Login with:
- Email: `admin@rtb.gov.rw`
- Password: `admin123`

## Troubleshooting

### Database Connection Error
- Make sure PostgreSQL is running
- Check DATABASE_URL in backend/.env
- Verify database exists: `psql -l`

### Port Already in Use
- Backend (5000): Change PORT in backend/.env
- Frontend (5173): Vite will auto-increment

### npm install fails
- Update npm: `npm install -g npm@latest`
- Clear cache: `npm cache clean --force`
