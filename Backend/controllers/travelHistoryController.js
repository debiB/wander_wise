const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const mongoose = require('mongoose');
const TravelHistory = require('../models/travelHistoryModel'); 
const { Types } = mongoose;
const { authenticateToken } = require('../middleware/authenticateToken');

async function getAllDestinationsByUserId(req, res) {
    const userId = req.user.id; 

    try {
        const userIdObj = Types.ObjectId.isValid(userId) ? new Types.ObjectId(userId) : null;

        if (!userIdObj) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        const travelHistory = await TravelHistory.findOne({ userId: userIdObj });
        if (!travelHistory) {
            return res.status(404).json({ message: 'User travel history not found' });
        }

        res.json(travelHistory.destinations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getDestinationByUserIdAndDestinationId(req, res) {
    const userId = req.user.id; 
    const destinationId = req.query.destinationId;

    try {
        const userIdObj = Types.ObjectId.isValid(userId) ? new Types.ObjectId(userId) : null;
        const destIdObj = Types.ObjectId.isValid(destinationId) ? new Types.ObjectId(destinationId) : null;

        if (!userIdObj || !destIdObj) {
            return res.status(400).json({ message: 'Invalid user ID or destination ID format' });
        }

        const travelHistory = await TravelHistory.findOne({ userId: userIdObj });

        if (!travelHistory) {
            return res.status(404).json({ message: 'User travel history not found' });
        }

        const destination = travelHistory.destinations.id(destIdObj);

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
    const userId = req.user.id;
    const destinationName = req.query.destinationName;

    try {
      
        const userIdObj = Types.ObjectId.isValid(userId) ? new Types.ObjectId(userId) : null;

        if (!userIdObj) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

       
        const travelHistory = await TravelHistory.findOne({ userId: userIdObj });

        if (!travelHistory) {
            console.log('Travel history not found for user:', userId);
            return res.status(404).json({ message: 'User travel history not found' });
        }

        
        const trimmedDestinationName = destinationName.trim().toLowerCase();

        
        const destination = travelHistory.destinations.find(dest => dest.name.toLowerCase() === trimmedDestinationName);
        
        if (!destination) {
            console.log('Destination not found:', destinationName);
            return res.status(404).json({ message: 'Destination not found for the user' });
        }

        res.json(destination);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



async function generateTravelRecommendation(req, res) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const userId = req.user.id; 
    const customDescription = req.body.customDescription || ''; 

    try {
        const userIdObj = new Types.ObjectId(userId);  
        const travelHistory = await TravelHistory.findOne({ userId: userIdObj }); 

        if (!travelHistory) {
            return res.status(404).json({ message: 'User travel history not found' });
        }

        const formattedTravelHistory = travelHistory.destinations.map(dest => [dest.name, dest.rating]);

        let prompt;

        if (customDescription) {
            prompt = `Based on the travel history of visiting ${formattedTravelHistory.map(item => `${item[0]} (Rating: ${item[1]}/5)`).join(", ")}, with the following additional considerations: ${customDescription}, recommend one new travel destination. Do not add any extra text. Only give me the name of the place.`;
        } else {
            prompt = `Based on the travel history of visiting ${formattedTravelHistory.map(item => `${item[0]} (Rating: ${item[1]}/5)`).join(", ")}, recommend one new travel destination. Do not add any extra text. Only give me the name of the place.`;
        }

        const response = await model.generateContent(prompt);
        const result = await response.response 
        const text = result.text();

        res.json({reccomendation: text});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function addTravelHistory(req, res) {
    const userId = req.user.id; 
    const newDestinations = req.body.destination; 

    try {
        const userIdObj = Types.ObjectId.isValid(userId) ? new Types.ObjectId(userId) : null;

        if (!userIdObj) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        const travelHistory = await TravelHistory.findOne({ userId: userIdObj });

        if (travelHistory) {
            newDestinations.forEach(destination => {
                if (!travelHistory.destinations.some(dest => dest.name === destination.name)) {
                    travelHistory.destinations.push(destination);
                }
            });
            await travelHistory.save();
        } else {
            await TravelHistory.create({
                userId: userIdObj,
                destinations: newDestinations
            });
        }

        res.status(200).json({ message: 'Travel history updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = { 
    getAllDestinationsByUserId, 
    getDestinationByUserIdAndDestinationId, 
    getDestinationByUserIdAndDestinationName, 
    generateTravelRecommendation, 
    addTravelHistory 
};
