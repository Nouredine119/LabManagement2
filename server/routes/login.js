const express = require('express');
const loginController = require('../controllers/LoginController');

const router = express.Router();

router.post('/login',loginController.Login);

module.exports = router;