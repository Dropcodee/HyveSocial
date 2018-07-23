const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceData(data) {
  const errors = {};

  // checking for empty strings and if there is make the value an empty string
  // to enable validator test it as one.

  data.title = !isEmpty(data.title) ? data.title : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  // end of check

  // validator checks for empty string and prints out errors

  if (Validator.isEmpty(data.title)) {
    errors.title = "Job title field is required";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "Job starting date field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
