const express = require('express');
const registerController = require('../controllers/RegisterController');

const router = express.Router();

router.post('/register',registerController.Register);

module.exports = router;