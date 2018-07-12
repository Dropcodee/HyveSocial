const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const Key = require("../../config/keys");

// import registration validation here
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// load user model
const User = require("../../models/User");

router.get("/test", (req, res) => res.json({ msg: "we have 0 users" }));

// @route POST api/users/register
// @desc register users through this api
// @access Public

router.post("/register", (req, res) => {
	const { isValid, errors } = validateRegisterInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			errors.email = "Email already exists";
			return res.status(400).json(errors);
		} else {
			const avatar = gravatar.url(req.body.email, {
				s: "200", //SIZE
				r: "x", // RATING
				d: "retro" //DEFAULT
			});
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
				avatar
			});
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) {
						console.log(err);
					}
					newUser.password = hash;
					newUser
						.save()
						.then(user => res.json(user))
						.catch(err => console.log(err));
				});
			});
		}
	});
});

// @route POST api/users/login
// @desc Login User by returning JW Token
// @access Public

router.post("/login", (req, res) => {
	const { isValid, errors } = validateLoginInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}
	const email = req.body.email;
	const password = req.body.password;

	// Find the user by email in the database
	User.findOne({ email }).then(user => {
		if (!user) {
			errors.email = "User not found";
			return res.status(404).json(errors);
		}
		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				// setup payload
				const payload = { id: user.id, name: user.name, avatar: user.avatar };

				// JWT TOKEN GENERATING

				jwt.sign(
					payload,
					Key.secretOrKey,
					{ expiresIn: 3600 },
					(err, token) => {
						res.json({
							success: true,
							token: "Bearer " + token
						});
					}
				);
			} else {
				errors.password = "Incorrect Password";
				return res.status(400).json(errors);
			}
		});
	});
});

// @route GET api/users/current
// @desc Return current user after token verification
// @access Private

router.get(
	"/current",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		res.json({
			id: req.user.id,
			name: req.user.name,
			email: req.user.email,
			avatar: req.user.avatar
		});
	}
);

module.exports = router;
