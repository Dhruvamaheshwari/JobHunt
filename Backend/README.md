# Job-Listing Ingestion System - Backend Foundation (Part 1)

This project is Part 1 of a Job-Listing Ingestion System built using **Node.js**, **Express**, and **MongoDB**.

---

## 📁 Project Structure

```text
Backend/
├── config/
│   └── db.connect.js        # MongoDB connection configuration using Mongoose
├── controller/
│   └── jobController.js     # Controller handling job endpoints logic
├── middleware/
│   └── errorMiddleware.js   # 404 & centralized error handling middleware
├── services/
│   └── jobFetcher.js        # Public job API fetcher & duplicate prevention logic
├── model/
│   └── Job.js               # Mongoose schema for Job listings
├── routers/
│   └── jobRoutes.js         # API route handlers for /api/jobs
├── .env                     # Local environment variables (git-ignored)
├── .env.example             # Example environment configuration template
├── index.js                 # Entry point of Express app
└── package.json             # Node dependencies and scripts
```

---

## 🛠️ Prerequisites & Setup

### 1. Requirements
- **Node.js** (v18+)
- **MongoDB** (Local or MongoDB Atlas instance)

### 2. Installation

1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Environment Setup:
   Copy `.env.example` to `.env` and fill in your connection details:
   ```bash
   cp .env.example .env
   ```

   *Sample `.env`:*
   ```env
   PORT=4000
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>
   ```

---

## 🚀 Running the Server

- **Development Mode** (with hot reloading):
  ```bash
  npm start
  ```

The server will start at `http://localhost:4000`.

---

## 📡 API Endpoints

| Method | Endpoint           | Description                                                 |
| ------ | ------------------ | ----------------------------------------------------------- |
| GET    | `/`                | Health check endpoint                                       |
| GET    | `/api/jobs?page=1&limit=10` | Retrieve paginated job posts from MongoDB |
| POST   | `/api/jobs/ingest` | Manually trigger fetching jobs from public API (Remotive)   |

---

## 🛡️ Error Handling
- Includes custom 404 middleware for unhandled endpoints.
- Global error response format across controllers.
