const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

async function getAllTravelHistory(req, res) {
    const userId = req.query.userId;

    try {
        
        const userTravelHistory = await mongoose.connection.collection('TravelHistory').find({ userId: userId }).toArray();
        res.json(userTravelHistory);
    } catch (error) {
        
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
async function getDestinationByUserIdAndDestinationId(req, res) {
    const userId = req.query.userId;
    const destinationId = req.query.destinationId;

    try {
        
        const user = await mongoose.connection.collection('Users').findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const destination = user.destinations.find(dest => dest.id === destinationId);

        if (!destination) {
            return res.status(404).json({ message: 'Destination not found for the user' });
        }

        
        res.json(destination);
    } catch (error) {
      
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
    async function getDestinationByUserIdAndDestinationName(req, res) {
    const userId = req.query.userId;
    const destinationName = req.query.destinationName;

    try {
        
        const user = await mongoose.connection.collection('Users').findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const destination = user.destinations.find(dest => dest.name === destinationName);

        if (!destination) {
            return res.status(404).json({ message: 'Destination not found for the user' });
        }

        
        res.json(destination);
    } catch (error) {
        
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}





module.exports = {getAllTravelHistory,getDestinationByUserIdAndDestinationId, getDestinationByUserIdAndDestinationName };