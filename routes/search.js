const express = require('express');
const router = express.Router();
const destinationController = require('../Controller/search');
const isAuth = require('../middleware/is-auth');

router.get('/search',isAuth, destinationController.getSearchPage);

router.post('/search',isAuth, destinationController.postSearch);

module.exports = router;
