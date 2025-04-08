const express = require('express');

const router = express.Router();

const homeController = require('../Controller/home');

const isAuth = require('../middleware/is-auth');

router.get('/',isAuth,homeController.getHome);

router.get('/hiking',isAuth,homeController.getHiking);

router.get('/islands',isAuth,homeController.getIsland);

router.get('/cities',isAuth,homeController.getCities);

router.get('/wanttogo',isAuth,homeController.getWantToGo);

module.exports = router;