const express = require('express');
const travelHistoryController = require('../controllers/travelHistoryController');

const router = express.Router();


router.get('/getAllTravelHistory', travelHistoryController.getAllDestinationsByUserId);
router.get('/getAllTravelHistoryById', travelHistoryController.getDestinationByUserIdAndDestinationId);
router.post('/getAllTravelHistoryName', travelHistoryController.getDestinationByUserIdAndDestinationName);
router.post('/generate-recommendation', travelHistoryController.generateTravelRecommendation);
module.exports = router;
