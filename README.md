# Library Book Catalog System (MERN)

A complete full-stack Library Book Catalog web application using:
- Frontend: React + Tailwind CSS + Axios + React Router
- Backend: Node.js + Express.js
- Database: MongoDB (Mongoose)
- Auth: JWT + bcrypt

## Folder Structure

```text
library-book-catalog-system/
  backend/
    config/
    controllers/
    middleware/
    models/
    routes/
    scripts/
    .env.example
    package.json
    server.js
  frontend/
    public/
    src/
      components/
      context/
      pages/
      routes/
      services/
      App.jsx
      main.jsx
      index.css
    .env.example
    package.json
  README.md
```

## Backend Setup

1. Open terminal in `backend`:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` from `.env.example` and set values.
4. Seed sample data (admin/user/books):
   ```bash
   npm run seed
   ```
5. Start backend:
   ```bash
   npm run dev
   ```

Backend runs on: `http://localhost:5000`

## Frontend Setup

1. Open terminal in `frontend`:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` from `.env.example`.
4. Run frontend:
   ```bash
   npm run dev
   ```

Frontend runs on Vite default URL (usually `http://localhost:5173`).

## Environment Variables

### backend/.env
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/library_catalog_db
JWT_SECRET=replace_with_strong_secret_key
JWT_EXPIRES_IN=7d
BORROW_DAYS=14
ADMIN_EMAIL=admin@library.com
ADMIN_PASSWORD=Admin@123
```

### frontend/.env
```env
VITE_API_URL=http://localhost:5000/api
```

## Default Seeded Accounts

- Admin: `admin@library.com` / `Admin@123`
- User: `user@library.com` / `User@123`

## API Summary

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Books
- `GET /api/books`
- `GET /api/books/:id`
- `POST /api/books` (admin)
- `PUT /api/books/:id` (admin)
- `DELETE /api/books/:id` (admin)

### Borrow
- `POST /api/borrow/:bookId`
- `PUT /api/return/:bookId`
- `GET /api/borrow/user`
- `GET /api/borrow/records` (admin)

## Notes

- JWT token and user data are stored in localStorage.
- Passwords are hashed with bcrypt before saving.
- Validation is applied on auth/book creation endpoints.
- Protected routes are enforced in backend and frontend.
