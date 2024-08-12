const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const mongoose = require('mongoose');
const TravelHistory = require('../models/travelHistoryModel'); 
const { ObjectId } = mongoose.Types;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function getAllDestinationsByUserId(req, res) {
    const userId = req.body.userId;

    try {
        const userIdObj = new ObjectId(userId);
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
    const userId = req.query.userId;
    const destinationId = req.query.destinationId;

    try {
        const userIdObj = new ObjectId(userId);
        const travelHistory = await TravelHistory.findOne({ userId: userIdObj });

        if (!travelHistory) {
            return res.status(404).json({ message: 'User travel history not found' });
        }

        const destination = travelHistory.destinations.find(dest => dest._id.toString() === destinationId);

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
        const userIdObj = new ObjectId(userId);
        const travelHistory = await TravelHistory.findOne({ userId: userIdObj });

        if (!travelHistory) {
            return res.status(404).json({ message: 'User travel history not found' });
        }

        const destination = travelHistory.destinations.find(dest => dest.name === destinationName);

        if (!destination) {
            return res.status(404).json({ message: 'Destination not found for the user' });
        }

        res.json(destination);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function generateTravelRecommendation(req, res) {
    const userId = req.body.userId;
    const customDescription = req.body.customDescription || ''; 

    try {
        const userIdObj = new ObjectId(userId);  
        const travelHistory = await TravelHistory.findOne({ userId: userIdObj }); 

        if (!travelHistory) {
             console.log('Request body:', req.body);
console.log('Converted ObjectId:', userIdObj);
            return res.status(404).json({ message: 'User travel history not found' });
        }

        const formattedTravelHistory = travelHistory.destinations.map(dest => [dest.name, dest.rating]);

        let prompt;

        if (customDescription) {
            prompt = `Based on the travel history of visiting ${formattedTravelHistory.map(item => `${item[0]} (Rating: ${item[1]}/5)`).join(", ")}, with the following additional considerations: ${customDescription}, please recommend a new travel destination.`;
        } else {
            prompt = `Based on the travel history of visiting ${formattedTravelHistory.map(item => `${item[0]} (Rating: ${item[1]}/5)`).join(", ")}, please recommend a new travel destination.`;
        }
       


       
        const response = await model.generateText({ prompt });
        const recommendation = response.data.choices[0].text.trim();

        res.json({ recommendation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



module.exports = { getAllDestinationsByUserId, getDestinationByUserIdAndDestinationId, getDestinationByUserIdAndDestinationName, generateTravelRecommendation};
