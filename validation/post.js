const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostData(data) {
  const errors = {};

  // checking for empty strings and if there is make the value an empty string
  // to enable validator test it.

  data.postText = !isEmpty(data.postText) ? data.postText : "";
  // end of check

  if (!Validator.isLength(data.postText, { min: 10, max: 350 })) {
    errors.postText = "Posts must be between 10 and 350 characters";
  }
  if (Validator.isEmpty(data.postText)) {
    // validator checks for empty string and prints out errors
    errors.postText = "Text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
