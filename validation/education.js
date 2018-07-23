const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducationData(data) {
  const errors = {};

  // checking for empty strings and if there is make the value an empty string
  // to enable validator test it as one.

  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.department = !isEmpty(data.department) ? data.department : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  // end of check

  // validator checks for empty string and prints out errors

  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Programme Degree field is required";
  }
  if (Validator.isEmpty(data.department)) {
    errors.department = "Department field is required";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "School starting date field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
