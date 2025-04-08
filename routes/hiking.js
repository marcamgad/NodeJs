const express = require('express');

const router = express.Router();

const hikingController = require('../Controller/hiking');

const isAuth = require('../middleware/is-auth');

router.get('/inca',isAuth,hikingController.getInca);
router.get('/annapurna',isAuth,hikingController.getAnnapurna);

module.exports = router;