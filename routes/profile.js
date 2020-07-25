// 1
const express = require("express");
const router = express.Router();

const passport = require("passport");

const checkAuth = passport.authenticate("jwt", { session: false });

// 3

// @route POST http://localhost:5000/profile
// @desc Register user profile
// @access Private
router.post("/", checkAuth, (req, res) => {});

// @route DELETE http://localhost:5000/profile/:id
// @desc Delete user profile
// @access Private
router.delete("/:id", checkAuth, (req, res) => {});

// 2
module.exports = router;
