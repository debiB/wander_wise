require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors middleware
const authRoutes = require('./routes/authRoutes');
const TravelHistoryRoutes = require('./routes/TravelHistoryRoutes');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3001',
  allowedHeaders: 'Content-Type',
})); 

app.use('/auth', authRoutes);
app.use('/user', TravelHistoryRoutes);
const mongoURI = 'mongodb://localhost:27017/Wander_wise';

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the Express server
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });