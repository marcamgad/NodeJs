const express = require('express');

const router = express.Router();

const authController = require('../Controller/auth');

router.get('/login',authController.getLogin);

router.get('/registration',authController.getSignup);

router.post('/login',authController.postLogin);

router.post('/registration',authController.postSignUp);

module.exports = router;