// 1
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const passport = require("passport");

const checkAuth = passport.authenticate("jwt", { session: false });

const userModel = require("../model/user");

const {
  register_user,
  login_user,
  current_user,
  forgot_password,
  reset_password,
} = require("../controller/user");

// @route POST http://localhost:5000/user/register
// @desc Register user API
// @access Public

router.post("/register", register_user);

// @route POST http://localhost:5000/user/login
// @desc Login user / returning jwt
// @access Public

router.post("/login", login_user);

// @route GET /current
// @desc Current user
// @access Private
router.get("/current", checkAuth, current_user);

// @route POST http://localhost:5000/user/activation
// @desc Activation account / confirm email
// @access Private
router.post("/activation", (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          errors: "expired link. Signup again",
        });
      } else {
        const { name, email, password } = jwt.decode(token);

        const newUser = new userModel({
          name,
          email,
          password,
        });

        newUser
          .save()
          .then((user) => {
            res.status(200).json({
              success: true,
              userInfo: user,
            });
          })
          .catch((err) =>
            res.status(400).json({
              success: false,
              errors: err,
            })
          );
      }
    });
  }
});

// @route PUT http://localhost:5000/user/forgotpassword
// @desc Forgot password / send email
// @access Private
router.put("/forgotpassword", forgot_password);

// @route PUT http://localhost:5000/user/resetpassword
// @desc Reset password
// @access Private
router.put("/resetpassword", reset_password);

// 2
module.exports = router;
