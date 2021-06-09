var compression = require('compression')
const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');
const mongoose = require('mongoose');
const meme = require('../models/meme');
router.use(compression());

router.get('/', async (req, res) => {
    const allMemes = await meme.find();
    res.status(200).send(allMemes);
});

router.get('/:id', async (req,res) => {
    const id = req.params.id;
    const newMeme = await meme.find({id:id});
    if(newMeme.length>0) {
        res.status(200).send(newMeme);
    }
    else {
        res.status(404).send(newMeme);
    }
});

router.post('/', async (req,res) => {
    let name = req.body.name;
    let url = req.body.url;
    let caption = req.body.caption;
    console.log(req);
    const newMeme = new meme({
        name: name,
        url: url,
        caption: caption,
        reg_date: moment().tz("Asia/Kolkata").format('L'),
        reg_time: moment().tz("Asia/Kolkata").format('HH:mm:ss'),
    });

    // complete put post delete by tomorrow.
    // get is ready.
    // integrate with mongoose.

});

module.exports= router;
