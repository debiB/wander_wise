
const mongoose = require('mongoose');

const travelHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    destinations: [{
        name: String,
        rating: Number
    }]
});

module.exports = mongoose.model('TravelHistory', travelHistorySchema, 'TravelHistory');
