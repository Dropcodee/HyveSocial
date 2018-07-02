const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// bringing in validation
const validateProfileData = require("../../validation/profile");
// BRINGING IN PROFILE & USER MODELS
const Profile = require("../../models/Profile");
// USER MODEL
const User = require("../../models/User");
// DONE BRINGING IN MODELS

router.get("/test", (req, res) => res.json({ msg: "we have 0 profile" }));

// @route: GET api/profile
// @desc: GET CURRENT USERS PROFILE
// @access: PRIVATE
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "No profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route: POST api/profile
// @desc: POST NEW AND CURRENT USERS PROFILE
// @access: PRIVATE

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileData(req.body);

    // checking validation
    if (!isValid) {
      // return all the errors
      return res.status(400).json(errors);
    }
    // GET FIELDS FROM THE FORM AND SCHEMA
    const ProfileInputs = {};
    ProfileInputs.user = req.user.id;

    // checking for value before sending to db
    if (req.body.handle) ProfileInputs.handle = req.body.handle;
    if (req.body.company) ProfileInputs.company = req.body.company;
    if (req.body.website) ProfileInputs.website = req.body.website;
    if (req.body.location) ProfileInputs.location = req.body.location;
    if (req.body.status) ProfileInputs.status = req.body.status;
    if (req.body.bio) ProfileInputs.bio = req.body.bio;
    if (req.body.githubusername)
      ProfileInputs.githubusername = req.body.githubusername;
    // SKILLS
    if (typeof req.body.skills !== "undefined") {
      ProfileInputs.skills = req.body.skills.split(",");
    }
    // SOCIAL NETWORKS
    ProfileInputs.social = {};
    if (req.body.youtube) ProfileInputs.social.youtube = req.body.youtube;
    if (req.body.facebook) ProfileInputs.social.facebook = req.body.facebook;
    if (req.body.twitter) ProfileInputs.social.twitter = req.body.twitter;
    if (req.body.instagram) ProfileInputs.social.instagram = req.body.instagram;
    if (req.body.linkedin) ProfileInputs.social.linkedin = req.body.linkedin;

    // profile update if there is one
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: ProfileInputs },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // create
        // first check if there is an existing profile handle
        Profile.findOne({ handle: ProfileInputs.handle }).then(profile => {
          if (profile) {
            errors.handleExists = "Sorry profile handle already exists";
            res.status(400).json(errors);
          }
          // creates and saves profile
          new Profile(ProfileInputs).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

module.exports = router;
