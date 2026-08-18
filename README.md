# JobHunt - Job-Listing Ingestion & Exploration Platform

JobHunt is a full-stack job ingestion and exploration application built with **Node.js, Express, MongoDB (Backend)** and **React, Vite, TailwindCSS (Frontend)**. It automatically ingests remote job listings from a public API, stores them in MongoDB with deduplication, and provides a search and filter dashboard with pagination.

---

## 🛠️ Local Development Setup

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **MongoDB Database** (MongoDB Atlas cloud database or local MongoDB instance)

---

### 2. Backend Setup & Local Execution

1. Navigate to the `Backend` folder:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. Configure `.env`:
   ```env
   PORT=4000
   MONGO_URI=your_mongodb_connection_string
   ```

5. Run Backend in development mode:
   ```bash
   npm run dev
   ```
   The backend server will run at `http://localhost:4000`.

---

### 3. Frontend Setup & Local Execution

1. Open a new terminal and navigate to the `Frontend` folder:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. Configure `.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:4000/api/jobs
   ```

5. Run Frontend in development mode:
   ```bash
   npm run dev
   ```
   The frontend application will run at `http://localhost:5173`.

---

## 🔐 Environment Variables Summary

| Directory | File | Variable | Purpose |
| :--- | :--- | :--- | :--- |
| `Backend/` | `.env` | `PORT` | Port number for Express API server (default: `4000`) |
| `Backend/` | `.env` | `MONGO_URI` | MongoDB Atlas / local database connection URI |
| `Frontend/` | `.env` | `VITE_API_BASE_URL` | Base URL pointing to Express Backend API endpoint |

---

## 🚀 Deployment Guide

### 1. Database Deployment (MongoDB Atlas)
1. Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a cluster (Free Tier M0).
3. Create a Database User under **Database Access**.
4. Allow access from anywhere (`0.0.0.0/0`) under **Network Access**.
5. Copy the Connection String URI for use in your backend deployment.

---

### 2. Backend Deployment (Render / Railway)

#### Deploying on Render:
1. Push project repository to GitHub.
2. Sign in to [Render](https://render.com) and click **New +** -> **Web Service**.
3. Connect your GitHub repository.
4. Set configuration:
   - **Root Directory:** `Backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add Environment Variables under **Environment**:
   - `MONGO_URI`: *Your MongoDB Atlas connection URI*
   - `PORT`: `4000` (or leave default assigned by Render)
6. Click **Deploy Web Service**. Once deployed, copy your backend public URL (e.g. `https://jobhunt-backend.onrender.com`).

---

### 3. Frontend Deployment (Vercel / Netlify)

#### Deploying on Vercel:
1. Sign in to [Vercel](https://vercel.com) and click **Add New** -> **Project**.
2. Import your GitHub repository.
3. Set configuration:
   - **Framework Preset:** Vite
   - **Root Directory:** `Frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add Environment Variable:
   - `VITE_API_BASE_URL`: `https://jobhunt-backend.onrender.com/api/jobs`
5. Click **Deploy**.

---

## 🧪 Testing Production API & Frontend

1. **Verify Backend Health Check:**
   Open browser or Postman and visit `GET https://your-backend-url.onrender.com/`  
   Expected Output: `{"message": "Job-Listing Ingestion API Server running..."}`

2. **Verify Job Ingestion:**
   Send a POST request to `POST https://your-backend-url.onrender.com/api/jobs/ingest`  
   Expected Output: `{"success": true, "message": "Jobs ingested successfully", "data": {"fetched": 20, "added": ...}}`

3. **Verify Job Fetching API:**
   Send a GET request to `GET https://your-backend-url.onrender.com/api/jobs?page=1&limit=6`  
   Expected Output: JSON object containing total count, pages, and job listings.

4. **Verify Frontend UI:**
   Open deployed Frontend URL (e.g., `https://jobhunt.vercel.app`), perform search queries, test location/source filters, and navigate pagination buttons.
