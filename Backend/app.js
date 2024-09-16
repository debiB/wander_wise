require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const travelHistoryRoutes = require('./routes/TravelHistoryRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3001',  // Can be expanded to multiple origins or use an array
  allowedHeaders: ['Content-Type', 'Authorization'], // Include Authorization header
}));

// Routes
app.use('/auth', authRoutes);
app.use('/user', travelHistoryRoutes);

// MongoDB connection
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/Wander_wise'; // Use environment variable for MongoDB URI
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Server setup
const PORT = process.env.PORT || 3000; // Use environment variable for port
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
