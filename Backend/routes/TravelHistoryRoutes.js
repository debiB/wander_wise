const express = require('express');
const travelHistoryController = require('../controllers/travelHistoryController');

const router = express.Router();
router.get('/', travelHistoryController.getAllTravelHistory);
router.get('/:id', travelHistoryController.getDestinationByUserIdAndDestinationId);
router.post('/:name', travelHistoryController.getDestinationByUserIdAndDestinationName);
module.exports = router;