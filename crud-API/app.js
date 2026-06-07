const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Import routes
const apiRoutes = require('./routes/api');

// Middleware (IMPORTANT)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRoutes);

// Home route (optional test)
app.get('/', (req, res) => {
    res.send('CRUD API is running...');
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/crud_api_db')
    .then(() => {
        console.log('MongoDB Connected Successfully');
    })
    .catch((err) => {
        console.error('MongoDB Connection Error:', err);
    });

// IMPORTANT: export app (required for bin/www)
module.exports = app;