# JobPortal — MERN Full-Stack Job Recruitment Platform

A placement-ready MERN application with Student, Recruiter and Admin roles.

## Features
- JWT authentication with bcrypt password hashing
- Role-based access: student, recruiter, admin
- Student profile and skills
- Recruiter company creation
- Recruiter job CRUD
- Job search and filters
- Student job applications
- Application status tracking
- Recruiter applicant management
- Save/bookmark jobs
- Admin dashboard
- Responsive React UI

## Requirements
- Node.js 18+
- MongoDB local or MongoDB Atlas

## Run Backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env with your MongoDB URI and JWT secret
npm run dev
```

Backend runs on http://localhost:5000

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on http://localhost:5173

## Demo admin
Create a normal account first, then change its role to `admin` directly in MongoDB.
