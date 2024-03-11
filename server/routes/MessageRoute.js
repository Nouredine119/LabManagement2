const express = require('express');
const {messageController} = require('../controllers/MessageController');

const router = express.Router();

router.post('/message',messageController);

module.exports = router;