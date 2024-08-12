require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const travelHistoryRoutes = require('./routes/TravelHistoryRoutes');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3001',
  allowedHeaders: 'Content-Type',
}));

app.use('/auth', authRoutes);
app.use('/user', travelHistoryRoutes);

mongoose.connect('mongodb://localhost:27017/Wander_wise', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
