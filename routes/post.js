// 1
const express = require("express");
const router = express.Router();
const passport = require("passport");
const postModel = require("../model/post");

const checkAuth = passport.authenticate("jwt", { session: false });

const validatePostInput = require("../validation/post");
// 3
// @route POST http://localhost:5000/post
// @desc Create post
// @access Private
router.post("/", checkAuth, (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = new postModel({
    text: req.body.text,
    name: req.user.name,
    avatar: req.user.avatar,
    user: req.user.id,
  });

  newPost
    .save()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => res.status(500).json(err));
});

// 2
module.exports = router;
