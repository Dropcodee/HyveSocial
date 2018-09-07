const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostData(data) {
  const errors = {};

  // checking for empty strings and if there is make the value an empty string
  // to enable validator test it.

  data.text = !isEmpty(data.text) ? data.text : "";
  // end of check

  if (!Validator.isLength(data.text, { min: 10, max: 350 })) {
    errors.text = "Posts must be between 10 and 350 characters";
  }
  if (Validator.isEmpty(data.text)) {
    // validator checks for empty string and prints out errors
    errors.text = "Text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
