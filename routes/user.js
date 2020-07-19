// 1
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

const checkAuth = passport.authenticate("jwt", { session: false });

const userModel = require("../model/user");

function tokenGenerator(payload) {
  return jwt.sign(payload, process.env.SECRET, { expiresIn: 36000 });
}
// @route GET http://localhost:5000/user/test
// @desc TEST users route
// @access Public

// router.get("/test", (req, res) => {});

// @route POST http://localhost:5000/user/register
// @desc Register user API
// @access Public

router.post("/register", (req, res) => {
  // email 유무 체크 -> password 암호화 -> DB 저장

  const { name, email, password } = req.body;

  userModel
    .findOne({ email })
    .then((user) => {
      if (user) {
        return res.json({
          message: "email already exists",
        });
      } else {
        const newUser = new userModel({
          name,
          email,
          password,
        });

        newUser
          .save()
          .then((result) => {
            res.json({
              message: "save user",
              userInfo: {
                id: result._id,
                name: result.name,
                email: result.email,
                avatar: result.avatar,
                password: result.password,
                date: {
                  createdAt: result.createdAt,
                  updatedAt: result.updatedAt,
                },
              },
            });
          })
          .catch((err) => {
            res.json({
              error: err.message,
            });
          });

        // const avatar = gravatar.url(req.body.email, {
        //   s: "200", // size
        //   r: "pg", // rating
        //   d: "mm", // Default
        // });
        // bcrypt.hash(req.body.password, 10, (err, hash) => {
        //   if (err) {
        //     return res.json({
        //       message: err.message,
        //     });
        //   } else {
        //     const user = new userModel({
        //       name: req.body.name,
        //       email: req.body.email,
        //       password: hash,
        //       avatar: avatar,
        //     });
        //     user
        //       .save()
        //       .then((result) => {
        //         res.json({
        //           message: "save user",
        //           userInfo: result,
        //         });
        //       })
        //       .catch((err) => {
        //         res.json({
        //           error: err.message,
        //         });
        //       });
        //   }
        // });
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

router.post("/login", (req, res) => {
  // email 체크 -> password 체크 -> returning jwt

  const { email, password } = req.body;
  userModel
    .findOne({ email })
    .then((user) => {
      if (!user) {
        return res.json({
          message: "No email",
        });
      } else {
        user.comparePassword(password, (err, isMatch) => {
          if (err || isMatch === false) {
            return res.json({
              message: "password incorrect",
            });
          } else {
            const payload = {
              id: user._id,
              email: user.email,
              name: user.name,
              avatar: user.avatar,
            };

            res.json({
              message: "successful login",
              tokenInfo: tokenGenerator(payload),
            });
          }
        });
        // bcrypt.compare(password, user.password, (err, result) => {
        //   if (err || result === false) {
        //     return res.json({
        //       message: "password incorrect",
        //     });
        //   } else {

        //   }
        // });
      }
    })
    .catch((err) => {
      res.json({
        error: err.message,
      });
    });
});

// @route GET /current
// @desc Current user
// @access Private

router.get("/current", checkAuth, (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
    name: req.user.name,
    avatar: req.user.avatar,
  });
});

// 2
module.exports = router;
