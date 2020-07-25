// 1
const express = require("express");
const router = express.Router();

const passport = require("passport");

const checkAuth = passport.authenticate("jwt", { session: false });

const {
  register_user,
  login_user,
  current_user,
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

// 2
module.exports = router;
