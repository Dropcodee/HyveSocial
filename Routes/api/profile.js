const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// bringing in validation
const validateProfileData = require("../../validation/profile");
const validateExperienceData = require("../../validation/experience");
const validateEducationData = require("../../validation/education");
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

// @route: GET api/profile/handle/:handle
// @desc: GET USERS PROFILE BY USER HANDLE
// @access: PUBLIC
router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.handleNotFoundError = "Sorry user does not exist";
        res.status(404).json(errors);
      }
      // if the handle exists

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route: GET api/profile/user/:user_id
// @desc: GET USERS PROFILE BY USER ID
// @access: PUBLIC
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.handleNotFoundError = "Sorry user does not exist";
        res.status(404).json(errors);
      }
      // if the handle exists

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route: GET api/profile/all
// @desc: GET  ALL USERS PROFILE
// @access: PUBLIC
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.profilesNotFound = "No profiles found";
        return res.status.json(errors);
      }
      res.json(profiles);
    })
    .catch(err =>
      res.status(404).json({ appProfileError: "No Profiles Found" })
    );
});

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

// @route: POST  api/profile/experience
// @desc: POST USER EXPERIENCE AND ADD TO USER DATA
// @access: PRIVATE

router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceData(req.body);

    // checking validation
    if (!isValid) {
      // return all the errors
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExperienceInput = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // ADD DEVELOPER EXPERIENCE
      profile.experience.unshift(newExperienceInput);
      // save experience
      profile.save().then(profile => {
        res.json(profile);
      });
    });
  }
);

// @route: POST  api/profile/education
// @desc: POST USER EXPERIENCE AND ADD TO USER DATA
// @access: PRIVATE

router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationData(req.body);

    // checking validation
    if (!isValid) {
      // return all the errors
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEducationInput = {
        degree: req.body.degree,
        department: req.body.department,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // ADD DEVELOPER EDUCATION
      profile.education.unshift(newEducationInput);
      // save education
      profile.save().then(profile => {
        res.json(profile);
      });
    });
  }
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        profile.experience.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        // Splice out of array
        profile.education.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);
module.exports = router;
