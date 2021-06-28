const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const auth = require("../middleware/auth");


router.post("/signup", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});

router.post("/login", (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed"
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
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
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
        
        const user = await User.findOne({_id: claims._id});
        const {password, ...data} = await user.toJSON();
        res.send(data);

    } catch (e) {
        return res.status(401).send({
            message: 'no cookie provided',
        })
    }
});

router.post('/logout', (req, res) => {
  res.cookie('jwt', '', {maxAge: 0})
  res.send({
    message: 'logout success'
  })
});

module.exports = router;