var compression = require('compression')
const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');
const mongoose = require('mongoose');
const cmeme = require('../models/meme');
const shortid = require('shortid');
router.use(compression());

router.get('/memes', async (req, res) => {
    const c1 = await cmeme.find();
    res.status(200).send(c1);
});

router.get('/memes/:id', async (req,res) => {
    const id = req.params.id;
    const d = await cmeme.find({id:id});
    if(d.length>0) {
        res.status(200).send(d);
    }
    else {
        res.status(404).send(d);
    }
});

router.post('/memes', async (req,res) => {
    let name= req.body.name;
    let url= req.body.url;
    let caption= req.body.caption;
    console.log(req);
    let id=shortid.generate();
    const c = new cmeme({
        name: name,
        url: url,
        caption: caption,
        id: id,
        reg_date: moment().tz("Asia/Kolkata").format('L'),
        reg_time: moment().tz("Asia/Kolkata").format('HH:mm:ss'),
    });

    // complete put post delete by tomorrow.
    // get is ready.
    // integrate with mongoose.

});

module.exports= router;