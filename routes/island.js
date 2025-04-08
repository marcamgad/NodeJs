const express = require('express');

const router = express.Router();

const islandController = require('../Controller/island');

const isAuth = require('../middleware/is-auth');

router.get('/bali',isAuth,islandController.getBali);

router.get('/santorini',isAuth,islandController.getSantorini);

module.exports = router;