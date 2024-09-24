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
async function getFirstTwoDestinationsByUserId(req, res) {
    const userId = req.user.id;

    try {
        const userIdObj = Types.ObjectId.isValid(userId) ? new Types.ObjectId(userId) : null;

        if (!userIdObj) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        const travelHistory = await TravelHistory.findOne({ userId: userIdObj });
        if (!travelHistory || !travelHistory.destinations || travelHistory.destinations.length === 0) {
            return res.json({ message: 'No travel history found' });
        }

        const firstTwoDestinations = travelHistory.destinations.slice(0, 2); // Get first two destinations
        res.json(firstTwoDestinations);
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

        res.json({destinations: destination});
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
            prompt = `Based on the travel history of visiting ${formattedTravelHistory.map(item => `${item[0]} (Rating: ${item[1]}/5)`).join(", ")}, with the following additional considerations: ${customDescription}, recommend one new travel destination. Only provide the name of the place and do not recommend a location that is already in the travel history.`;
        } else {
            prompt = `Based on the travel history of visiting ${formattedTravelHistory.map(item => `${item[0]} (Rating: ${item[1]}/5)`).join(", ")}, recommend one new travel destination. Do not add any extra text. Only provide the name of the place and do not recommend a location that is already in the travel history.`;
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
const axios = require('axios');

async function fetchHotels(req, res) {
    const { 
        destination, 
        check_in_date, 
        check_out_date,
        adults,
        children,
        children_ages,
        sort_by,
        min_price,
        max_price,
        rating,
        special_offers,
        vacation_rentals,
        bedrooms,
        bathrooms
    } = req.body;

    // Only checkin, checkout, and destination are required
    if (!destination || !check_in_date || !check_out_date) {
        return res.status(400).json({ message: 'Missing required parameters: destination, check_in_date, check_out_date' });
    }

    try {
        // Create params object for the API call
        const params = {
            engine: 'google_hotels',
            q: destination,
            hl: 'en',
            check_in_date: check_in_date,
            check_out_date: check_out_date,
            api_key: process.env.GOOGLE_HOTELS_API_KEY,
            adults: adults || '1',  // Default to 1 adult if not provided
            children: children || '0',
            children_ages: children_ages || '',
            min_price: min_price || '',
            max_price: max_price || '',
            rating: rating || '',
            special_offers: special_offers || false,
            vacation_rentals: vacation_rentals || false,
            bedrooms: bedrooms || '',
            bathrooms: bathrooms || ''
        };

        // Conditionally add `sort_by` only if it's provided
        if (sort_by) {
            params.sort_by = sort_by;
        }

        // Fetch data from the Google Hotels API
        const hotelResponse = await axios.get('https://serpapi.com/search?engine=google_hotels', { params });

        // Extract hotels from the response
        const hotels = hotelResponse.data.properties || [];

        // Return the hotel data as JSON
        res.json({ hotels });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching hotels' });
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
    addTravelHistory, 
    getFirstTwoDestinationsByUserId, 
    fetchHotels 
};
