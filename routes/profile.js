// 1
const express = require("express");
const router = express.Router();

const passport = require("passport");

const checkAuth = passport.authenticate("jwt", { session: false });

const profileModel = require("../model/profile");
// 3

// @route GET http://localhost:5000/profile
// @desc current user profile
// @access Private
router.get("/", checkAuth, (req, res) => {
  profileModel
    .findOne({ user: req.user.id })
    .populate("user", ["name", "email", "avatar"])
    .then((profile) => {
      if (!profile) {
        return res.json({
          message: "No profile",
        });
      } else {
        res.json({
          message: "successful get profile",
          profileInfo: profile,
        });
      }
    })
    .catch((err) => res.json(err));
});

// @route POST http://localhost:5000/profile
// @desc Register / edit profile
// @access Private
router.post("/", checkAuth, (req, res) => {
  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.githubusername)
    profileFields.githubusername = req.body.githubusername;

  if (typeof req.body.skills !== "undefined") {
    profileFields.skills = req.body.skills.split(",");
  }

  // profile이 있는지 체크
  profileModel
    .findOne({ user: req.user.id })
    .then((profile) => {
      if (profile) {
        // profile정보가 있으면 update로 진행
        profileModel
          .findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          )
          .then((profile) => res.json(profile))
          .catch((err) => res.json(err));
        // return res.json({
        //   message: "profile already register, please update profile",
        // });
      } else {
        // profile이 없으면 등록
        new profileModel(profileFields)
          .save()
          .then((profile) => res.json(profile))
          .catch((err) => res.json(err));
      }
    })
    .catch((err) => res.json(err));
});

// @route DELETE http://localhost:5000/profile/:id
// @desc Delete user profile
// @access Private
router.delete("/:id", checkAuth, (req, res) => {});

// 2
module.exports = router;
