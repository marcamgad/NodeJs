const express = require('express');

const router = express.Router();

const cityController = require('../Controller/city');

const isAuth = require('../middleware/is-auth');

router.get('/paris',isAuth,cityController.getParis);

router.get('/rome',isAuth,cityController.getRome);

module.exports = router;