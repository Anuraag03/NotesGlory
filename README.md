# NotesGlory

Note Taking App
## NotesGlory

A fullstack notes app built with React (Vite) frontend and Express/MongoDB backend. Features authentication, CRUD for notes, pinning, tags, and live search.

## Features
- User registration and login (JWT authentication)
- Create, edit, delete, and pin notes
- Tag notes
- Live regex search for notes
- Responsive UI

## Requirements
- Node.js (v16+ recommended)
- npm
- MongoDB (local or cloud, e.g. MongoDB Atlas)

## Folder Structure
```
NotesGlory/
├── backend/         # Express backend
├── frontend/
│   └── notes-app/   # React frontend (Vite)
```

## Backend Setup
1. Go to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file:
   ```
   ACCESS_TOKEN_SECRET=your_jwt_secret
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Start the backend:
   ```sh
   npm start
   ```
   The backend runs on `http://localhost:3000/api`.

## Frontend Setup
1. Go to the frontend folder:
   ```sh
   cd frontend/notes-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file:
   ```
   VITE_REACT_APP_BACKEND_BASEURL=http://localhost:3000/api
   ```
4. Start the frontend:
   ```sh
   npm run dev
   ```
   The frontend runs on `http://localhost:5173` (default Vite port).

## Deployment
- **Frontend:** Deploy to Vercel, Netlify, or GitHub Pages (Vite static build)
- **Backend:** Deploy to Railway, Render, or Vercel (Node.js API)
- Update frontend `.env` to use your deployed backend URL

## Usage
- Register a new account or login
- Add, edit, delete, and pin notes
- Tag notes and use live search to filter

## Environment Variables
- **Backend:**
  - `ACCESS_TOKEN_SECRET`: JWT secret
  - `MONGODB_URI`: MongoDB connection string
- **Frontend:**
  - `VITE_REACT_APP_BACKEND_BASEURL`: Backend API base URL

## License
MIT