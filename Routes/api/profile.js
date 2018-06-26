const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// BRINGING IN PROFILE & USER MODELS
const Profile = require("../../models/Profile");
// USER MODEL
const User = require("../../models/User");
// DONE BRINGING IN MODELS
router.get("/test", (req, res) => res.json({ msg: "we have 0 profile" }));

module.exports = router;
