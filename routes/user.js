// 1
const express = require("express");
const router = express.Router();
const userModel = require("../model/user");

// @route GET http://localhost:5000/user/test
// @desc TEST users route
// @access Public

router.get("/test", (req, res) => {});

// @route POST http://localhost:5000/user/register
// @desc Register user API
// @access Public

router.post("/register", (req, res) => {});

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
