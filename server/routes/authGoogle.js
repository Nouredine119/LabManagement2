const express = require('express');
const google = require('../controllers/GoogleController');

const router = express.Router();

router.post('/google',google.Google);

module.exports = router;