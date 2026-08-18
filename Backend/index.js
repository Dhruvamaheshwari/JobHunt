require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.connect');
const jobRoutes = require('./routers/jobRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Job-Listing Ingestion API Server running...' });
});

app.use('/api/jobs', jobRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});