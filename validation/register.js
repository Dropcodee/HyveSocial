const Validator = require("validator");
const isEmpty = require("./is-empty"); // take note tutorial used import for dis action

module.exports = function validateRegisterInput(data) {
	const errors = {};

	if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
		errors.name = "Users name must be between  2 to 30 characters  ";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
