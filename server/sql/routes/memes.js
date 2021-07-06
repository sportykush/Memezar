var compression = require('compression')
const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');
const mysqlConnection = require('../db/mysql');
router.use(compression());

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM meme', (err,rows,fields) =>{
        if(!err) {
            res.send(rows);
        }
        else {
            console.log(err);
        }
    })
});

router.get('/:id', (req,res) => {
    const id = req.params.id;
    mysqlConnection.query('SELECT * FROM meme WHERE _id = ?', [id] , (err,rows,fields) =>{
        if(!err) {
            res.send(rows);
        }
        else {
            console.log(err);
        }
    })
});

router.post('/', async (req,res) => {
    const { name, caption, url } = req.body;
    console.log(req.body);
    let reg_date = moment().tz("Asia/Kolkata").format('L');
    let reg_time = moment().tz("Asia/Kolkata").format('HH:mm:ss');
    mysqlConnection.query(`INSERT INTO meme
    (name, caption, url, reg_time, reg_date) 
    VALUES 
    (?, ?, ?, ?, ?)`, [name,caption,url,reg_time,reg_date] , (err,rows,fields) =>{
        if(!err) {
            res.send(rows);
        }
        else {
            console.log(err);
        }
    })
});

// router.patch('/:id', async (req,res) => {
//     const id = req.params.id;
//     // const updateOps = {};
//     // for(const ops of req.body) {
//     //     updateOps[ops.propName] = ops.value
//     // }
//     meme.update({_id: id}, { $set: {name: req.body.name,
//         caption: req.body.caption,
//         url: req.body.url}})
//     .exec()
//     .then(result => {
//         res.send(result);
//     })
//     .catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while creating the Meme."
//         });
//     });
// });

router.delete('/:id', (req,res) => {
    const id = req.params.id;
    mysqlConnection.query('DELETE FROM meme WHERE _id = ?', [id] , (err,rows,fields) =>{
        if(!err) {
            res.send('Deleted Successfully!');
        }
        else {
            console.log(err);
        }
    })
});

module.exports= router;
