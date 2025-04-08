const express = require('express');
const destinationController = require('../Controller/destination');
const isAuth = require('../middleware/is-auth');  
const router = express.Router();

// Add destination to the "Want-to-Go" list
router.post('/wanttogo', isAuth, destinationController.addToWantToGo);

router.get('/wanttogo', isAuth, destinationController.getWantToGo);

module.exports = router;
