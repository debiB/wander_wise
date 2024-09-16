const express = require('express');
const travelHistoryController = require('../controllers/travelHistoryController');
const authenticateToken = require('../middleware/authenticateToken'); 

const router = express.Router();

router.use(authenticateToken);

router.get('/getAllTravelHistory', travelHistoryController.getAllDestinationsByUserId);
router.get('/getAllTravelHistoryById', travelHistoryController.getDestinationByUserIdAndDestinationId);
router.get('/getTwoTravelHistory', travelHistoryController.getFirstTwoDestinationsByUserId);
router.get('/getAllTravelHistoryName', travelHistoryController.getDestinationByUserIdAndDestinationName);
router.post('/generate-recommendation', travelHistoryController.generateTravelRecommendation);
router.post('/addTravelHistory', travelHistoryController.addTravelHistory);

module.exports = router;
