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
    meme.findById(id)
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });

    // const newMeme = await meme.find({_id:id});
    // if(newMeme.length>0) {
    //     res.status(200).send(newMeme);
    // }
    // else {
    //     res.status(404).send(newMeme);
    // }
});

router.post('/', async (req,res) => {

    let name = req.body.name;
    let caption = req.body.caption;
    let url = req.body.url;
    console.log(req.body);
    const newMeme = new meme({
        _id : new mongoose.Types.ObjectId(),
        name: name,
        caption: caption,
        url: url,
        reg_date: moment().tz("Asia/Kolkata").format('L'),
        reg_time: moment().tz("Asia/Kolkata").format('HH:mm:ss'),
    });
    newMeme
        .save()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Meme."
            });
        });
});


router.patch('/:id', async (req,res) => {
    const id = req.params.id;
    meme.update({_id: id}, { $set: {name: req.body.name,
        caption: req.body.caption,
        url: req.body.url}})
    .exec()
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the meme."
        });
    });
});

router.delete('/:id', async (req,res) => {
    const id = req.params.id;
    meme.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err,
        })
    })
});

module.exports= router;
