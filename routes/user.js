// 1
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const userModel = require("../model/user");

// @route GET http://localhost:5000/user/test
// @desc TEST users route
// @access Public

// router.get("/test", (req, res) => {});

// @route POST http://localhost:5000/user/register
// @desc Register user API
// @access Public

router.post("/register", (req, res) => {
  // email 유무 체크 -> password 암호화 -> DB 저장
  userModel
    .findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.json({
          message: "email already exists",
        });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200", // size
          r: "pg", // rating
          d: "mm", // Default
        });
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.json({
              message: err.message,
            });
          } else {
            const user = new userModel({
              name: req.body.name,
              email: req.body.email,
              password: hash,
              avatar: avatar,
            });
            user
              .save()
              .then((result) => {
                res.json({
                  message: "save user",
                  userInfo: result,
                });
              })
              .catch((err) => {
                res.json({
                  error: err.message,
                });
              });
          }
        });
      }
    })
    .catch((err) => {
      res.json({
        error: err.message,
      });
    });
});

// @route POST http://localhost:5000/user/login
// @desc Login user / returning jwt
// @access Public

router.post("/login", (req, res) => {});

// @route GET /current
// @desc Current user
// @access Private

router.get("/current", (req, res) => {});

// 2
module.exports = router;
