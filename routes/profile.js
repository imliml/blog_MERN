// 1
const express = require("express");
const router = express.Router();

const passport = require("passport");

const checkAuth = passport.authenticate("jwt", { session: false });

const profileModel = require("../model/profile");

const validateProfileInput = require("../validation/profile.js");

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

  const { errors, isValid } = validateProfileInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // profile이 있는지 체크
  profileModel
    .findOne({ user: req.user.id })
    .then((profile) => {
      if (profile) {
        // profile정보가 있으면 update로 진행
        profileModel
          .findOneAndUpdate(
            { user: req.user.id }, // 업데이트 대상자
            { $set: profileFields }, // 업데이트 내용
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
router.delete("/", checkAuth, (req, res) => {
  const profileId = req.user.id;
  profileModel
    .findOneAndDelete(profileId)
    .then(() =>
      res.json({
        message: "deleted profile",
      })
    )
    .catch((err) => res.json(err));
});

// @route GET http://localhost:5000/profile/total
// @desc total get user profile
// @access Public
router.get("/total", (req, res) => {
  profileModel
    .find()
    .then((docs) => res.status(200).json(docs))
    .catch((err) => res.status(500).json(err));
});

// @route POST http://localhost:5000/profile/experience
// @desc add experience to profile
// @access Private
router.post("/experience", checkAuth, (req, res) => {
  profileModel
    .findOne({ user: req.user.id })
    .then((profile) => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };

      profile.experience.unshift(newExp);
      profile
        .save()
        .then((profile) => res.status(200).json(profile))
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => res.status(500).json(err));
});

// @route POST http://localhost:5000/profile/education
// @desc add education to profile
// @access Private
router.post("/education", checkAuth, (req, res) => {
  profileModel
    .findOne({ user: req.user.id })
    .then((profile) => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        major: req.body.major,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };

      profile.education.unshift(newEdu);
      profile
        .save()
        .then((profile) => res.status(200).json(profile))
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => res.status(500).json(err));
});

// @route DELETE http://localhost:5000/profile/experience/:exp_id
// @desc delete experience to profile
// @access Private
router.delete("/experience/:exp_id", checkAuth, (req, res) => {
  profileModel
    .findOne({ user: req.user.id })
    .then((profile) => {
      const removeIndex = profile.experience
        .map((item) => item.id)
        .indexOf(req.params.exp_id);

      profile.experience.splice(removeIndex, 1);
      profile
        .save()
        .then((profile) => {
          res.status(200).json(profile);
        })
        .catch((err) => res.status(404).json(err));
    })
    .catch((err) => res.status(500).json(err));
});

// @route DELETE http://localhost:5000/profile/education/:edu_id
// @desc delete education to profile
// @access Private
router.delete("/education/:edu_id", checkAuth, (req, res) => {
  profileModel
    .findOne({ user: req.user.id })
    .then((profile) => {
      const removeIndex = profile.education
        .map((item) => item.id)
        .indexOf(req.params.edu_id);

      profile.education.splice(removeIndex, 1);
      profile
        .save()
        .then((profile) => {
          res.status(200).json(profile);
        })
        .catch((err) => res.status(4040).json(err));
    })
    .catch((err) => res.status(500).json(err));
});

// 2
module.exports = router;
