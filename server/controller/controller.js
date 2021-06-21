const express = require("express");
const router = express.Router();
var compression = require('compression');
const moment = require('moment-timezone');

const meme = require('../routes/memes');
const users = require('../routes/users');

router.use('/', meme);
router.use('/user', users);

module.exports = router;
