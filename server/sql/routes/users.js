const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mysqlConnection = require('../db/mysql');
const jwt = require("jsonwebtoken");
require('dotenv').config();
// const auth = require("../middleware/auth");


router.post("/signup", (req, res, next) => {
    const { name, email, password } = req.body;
    mysqlConnection.query('SELECT email FROM user WHERE email = ?' , [email], (err, results) => {
        if(err) {
            console.log(err);
        } else if( results.length >= 1) {
            return res.status(409).json({
                message: "Mail exists"
            });
        } else {
            bcrypt.hash(password, 10, (err, hash) => {
              if (err) {
                return res.status(500).json({
                  error: err
                });
              } else { 
                mysqlConnection.query(`INSERT INTO user
                (name, email, password) 
                VALUES 
                (?, ?, ?)`, [name,email,hash] , (err,rows,fields) =>{
                    if(!err) {
                        console.log(rows);
                        res.status(201).json({
                            message: "User created"
                        });
                    }
                    else {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    }
                })
                }
            });
        }
    })
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    mysqlConnection.query('SELECT * FROM user WHERE email = ?' , [email], (err, user) => {
        if(err) {
            console.log(err);
            res.status(500).json({
                error: err
            });
        } else if( user.length < 1) { 
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        console.log(user);
        bcrypt.compare(password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed!",
              error : err
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                // email: user[0].email,
                _id: user[0]._id
              },
              process.env.JWT_PWT_KEY
              // {
              //     expiresIn: "1h"
              // }
            );
            res.header('x-auth-token', token);
            res.cookie('jwt', token, {
              httpOnly: true,
              maxAge: 24 * 60 * 60 * 1000 // 1 day
            });
            return res.status(200).json({
              message: "Auth successful",
              //token: token
            });
          }
          res.status(401).json({
            message: "Auth failed"
          });
        });
      //})
//       .catch(err => {
//         console.log(err);
//         res.status(500).json({
//           error: err
//         });
//       });
  })
});
router.get('/me', async (req, res) => {

  try {
        const cookie = req.cookies['jwt'];
        const claims = jwt.verify(cookie, process.env.JWT_PWT_KEY);        
        if (!claims) {
            return res.status(401).send({
                message: 'unauthenticated'
            })
        }        
        // const user = await User.findOne({_id: claims._id});
        const user ='';
        mysqlConnection.query('SELECT * FROM user WHERE _id = ?' , [claims._id], async (err, result) => {
            if(!err) {
                this.user = result;
                //const {password, ...data} = await result.toJSON();
                res.send(result[0]);
            }
            else {
                console.log(err);
            }
        });
        console.log(user);
        // const {password, ...data} = await user.toJSON();
        // res.send(data);

    } catch (e) {
        return res.status(401).send({
            message: 'no cookie provided',
        });
    }
});

router.post('/logout', (req, res) => {
  res.cookie('jwt', '', {maxAge: 0})
  res.send({
    message: 'logout success'
  })
});


module.exports = router;