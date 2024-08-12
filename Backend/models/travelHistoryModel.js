const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DestinationSchema = new Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
});

const TravelHistorySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  destinations: [DestinationSchema],
});

const TravelHistory = mongoose.model('TravelHistory', TravelHistorySchema);

module.exports = TravelHistory;