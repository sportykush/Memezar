const express = require("express");
const router = express.Router();
var compression = require('compression');
const moment = require('moment-timezone');


const meme = require('../routes/meme');
router.use('/', meme);

module.exports = router;