# Project Setup Guide

## Project Overview
Library Book Catalog System - A full-stack MERN application for managing library books and borrowing records.

**Tech Stack:**
- Frontend: React 18 + Vite + Tailwind CSS
- Backend: Node.js + Express + MongoDB
- Authentication: JWT + bcrypt

---

## Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas connection string)

---

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
The `.env` file has been created with default values. Update if needed:
- `MONGO_URI`: MongoDB connection string (default: local MongoDB)
- `JWT_SECRET`: Change to a strong secret in production
- `ADMIN_EMAIL` & `ADMIN_PASSWORD`: Admin credentials for seeding

### 3. Seed Sample Data
```bash
npm run seed
```
This will create:
- 1 Admin user
- 2 Regular users
- 20 sample books

### 4. Start Backend Server
```bash
npm run dev
```
Server will run on http://localhost:5000

---

## Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Environment Configuration
The `.env` file has been created with:
- `VITE_API_URL`: Backend API base URL (default: http://localhost:5000/api)

### 3. Start Development Server
```bash
npm run dev
```
Frontend will be available at http://localhost:5173

---

## Running the Full Application

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

Then open http://localhost:5173 in your browser.

---

## Default Credentials

**Admin Account:**
- Email: `admin@library.com`
- Password: `Admin@123`

**Test User:**
- Email: `user@library.com`
- Password: `User@123`

---

## Available Scripts

### Backend
- `npm run dev` - Start with nodemon (hot reload)
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data

### Frontend
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

---

## Project Structure

```
backend/
├── config/          # Database & token configuration
├── controllers/     # Route handlers
├── middleware/      # Auth, error handling, validation
├── models/          # Mongoose schemas
├── routes/          # API endpoints
├── scripts/         # Database seeding
└── server.js        # Entry point

frontend/
├── public/          # Static assets
├── src/
│   ├── components/  # React components
│   ├── context/     # Auth context
│   ├── pages/       # Page components
│   ├── routes/      # Route protection
│   ├── services/    # API calls
│   ├── App.jsx
│   └── main.jsx
└── vite.config.js   # Vite configuration
```

---

## Database Models

1. **User** - Admin/User accounts with JWT authentication
2. **Book** - Library book inventory with details
3. **BorrowRecord** - Individual borrow transactions
4. **Borrow** - Active borrow tracking (summary view)

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/admin-login` - Admin login

### Books
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get book details
- `POST /api/books` - Add new book (admin)
- `PUT /api/books/:id` - Update book (admin)
- `DELETE /api/books/:id` - Delete book (admin)

### Borrowing
- `POST /api/borrow/borrow-book` - Borrow a book
- `POST /api/borrow/return-book` - Return a book
- `GET /api/borrow/history` - Get borrow history

---

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or update `MONGO_URI` with your connection string
- Check if port 27017 is available

### CORS Issues
- Backend CORS is configured to accept frontend requests
- Update `server.js` if frontend URL changes

### Vite Port Already in Use
- Change frontend port in `vite.config.js`
- Or kill the process using the port

---

## Next Steps
1. Install dependencies for both backend and frontend
2. Ensure MongoDB is running
3. Run database seeding in backend
4. Start both servers
5. Access the application at http://localhost:5173

Good luck! 🚀
