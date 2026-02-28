# API Documentation - RTB Equipment Distribution System

Base URL: `http://localhost:5000/api`

## Authentication

All endpoints except `/auth/login` require JWT authentication.

Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Endpoints

### 1. Health Check

**GET** `/health`

Check if the API is running.

**Response:**
```json
{
  "status": "OK",
  "message": "RTB Equipment Distribution API"
}
```

---

### 2. Login

**POST** `/auth/login`

Authenticate admin user and receive JWT token.

**Request Body:**
```json
{
  "email": "admin@rtb.gov.rw",
  "password": "admin123"
}
```

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Login successful"
}
```

**Error Response (401):**
```json
{
  "message": "Invalid credentials"
}
```

**Validation Errors (400):**
```json
{
  "errors": [
    {
      "msg": "Invalid value",
      "param": "email",
      "location": "body"
    }
  ]
}
```

---

### 3. Create Employee

**POST** `/employees`

Register a new employee with laptop details.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
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
```

**Success Response (201):**
```json
{
  "data": {
    "id": 1,
    "first_name": "Samanta",
    "last_name": "ISHIMWE",
    "national_id": "1200071091330",
    "telephone": "0788888888",
    "email": "samanta@rtb.gov.rw",
    "department": "Human Resource",
    "position": "Manager",
    "laptop_manufacturer": "HP",
    "laptop_model": "Envy",
    "laptop_serial": "3400",
    "created_at": "2024-02-28T10:30:00.000Z"
  },
  "message": "Employee created successfully"
}
```

**Error Response (400) - Duplicate:**
```json
{
  "message": "Employee with this email, national ID, or laptop serial already exists"
}
```

**Error Response (401) - Unauthorized:**
```json
{
  "message": "Authentication required"
}
```

**Validation Errors (400):**
```json
{
  "errors": [
    {
      "msg": "Invalid value",
      "param": "email",
      "location": "body"
    }
  ]
}
```

---

### 4. Get Employees (Paginated)

**GET** `/employees?page=1&limit=10`

Retrieve a paginated list of all employees.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 10) - Items per page

**Success Response (200):**
```json
{
  "data": [
    {
      "id": 1,
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
  ],
  "page": 1,
  "limit": 10,
  "total": 1,
  "totalPages": 1
}
```

**Error Response (401) - Unauthorized:**
```json
{
  "message": "Authentication required"
}
```

---

## Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (missing or invalid token) |
| 500 | Internal Server Error |

---

## Testing with cURL

### Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@rtb.gov.rw","password":"admin123"}'
```

### Create Employee:
```bash
curl -X POST http://localhost:5000/api/employees \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "firstName": "John",
    "lastName": "DOE",
    "nationalId": "1234567890123",
    "telephone": "0781234567",
    "email": "john.doe@rtb.gov.rw",
    "department": "IT",
    "position": "Developer",
    "laptopManufacturer": "Dell",
    "laptopModel": "Latitude",
    "laptopSerial": "DL12345"
  }'
```

### Get Employees:
```bash
curl -X GET "http://localhost:5000/api/employees?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Testing with Postman

1. **Import Collection:**
   - Create a new collection "RTB Equipment API"
   - Add base URL variable: `{{baseUrl}}` = `http://localhost:5000/api`

2. **Login Request:**
   - Method: POST
   - URL: `{{baseUrl}}/auth/login`
   - Body (JSON):
     ```json
     {
       "email": "admin@rtb.gov.rw",
       "password": "admin123"
     }
     ```
   - Save token from response

3. **Create Employee Request:**
   - Method: POST
   - URL: `{{baseUrl}}/employees`
   - Headers: `Authorization: Bearer {{token}}`
   - Body (JSON): Employee data

4. **Get Employees Request:**
   - Method: GET
   - URL: `{{baseUrl}}/employees?page=1&limit=10`
   - Headers: `Authorization: Bearer {{token}}`

---

## Security Features

- ✅ JWT token authentication (24h expiration)
- ✅ Password hashing with bcrypt
- ✅ CORS protection
- ✅ Input validation with express-validator
- ✅ SQL injection prevention (parameterized queries)
- ✅ Protected routes (authentication middleware)

---

## Database Schema

### admins table:
```sql
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### employees table:
```sql
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  national_id VARCHAR(16) UNIQUE NOT NULL,
  telephone VARCHAR(15) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  department VARCHAR(100) NOT NULL,
  position VARCHAR(100) NOT NULL,
  laptop_manufacturer VARCHAR(50) NOT NULL,
  laptop_model VARCHAR(50) NOT NULL,
  laptop_serial VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
