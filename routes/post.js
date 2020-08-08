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

// @route GET http://localhost:5000/post/total
// @desc total get post
// @access Public
router.get("/total", (req, res) => {
  postModel
    .find()
    .sort({ date: -1 })
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => res.status(500).json(err));
});

// @route GET http://localhost:5000/post/:post_id
// @desc detail post
// @access Private
router.get("/:post_id", checkAuth, (req, res) => {
  postModel
    .findById(req.params.post_id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => res.status(500).json(err));
});

// @route DELETE http://localhost:5000/post/:post_id
// @desc delete post
// @access Private
router.delete("/:post_id", checkAuth, (req, res) => {
  postModel
    .findById(req.params.post_id)
    .then((post) => {
      if (post.user.toString() !== req.user.id) {
        return res.status(400).json({
          message: "User not authorized",
        });
      }
      post.remove().then(() => res.json({ success: true }));
    })
    .catch((err) => res.status(500).json(err));
});
// 2
module.exports = router;
