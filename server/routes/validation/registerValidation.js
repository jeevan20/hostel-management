const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateRegisterInput = (data) => {
  let errors = {};
  if (isEmpty(data.name)) {
    errors.name = "Name field can not be empty";
  } else if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters long";
  }
  if (isEmpty(data.password)) {
    errors.password = "Password field can not be empty";
  } else if (!Validator.isLength(data.password, { min: 3, max: 150 })) {
    errors.password = "Password must be between 6 and 150 characters long";
  }

  // check the email field
  if (isEmpty(data.email)) {
    errors.email = "Email field can not be empty";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid, please provide a valid email";
  }

  // check password field

  // check name field

  //rollno field
  if (isEmpty(data.rollno)) {
    errors.rollno = "rollno field can not be empty";
  } else if (!Validator.isLength(data.rollno, { min: 5, max: 30 })) {
    errors.name = "rollno must be between 5 and 30 characters long";
  }
  if (isEmpty(data.regno)) {
    errors.regno = "regno field can not be empty";
  } else if (!Validator.isLength(data.regno, { min: 4, max: 30 })) {
    errors.regno = "regno must be between 6 and 30 characters long";
  }

  if (isEmpty(data.department)) {
    errors.department = "department field can not be empty";
  } else if (!Validator.isLength(data.roomno, { min: 2, max: 4 })) {
    errors.name = "department must be between 2 and 4 characters long";
  }
  if (isEmpty(data.roomno)) {
    errors.name = "Roomno field can not be empty";
  } else if (!Validator.isLength(data.roomno, { min: 2, max: 4 })) {
    errors.name = "roomno must be between 2 and 4 characters long";
  }
  //   // check confirm password field
  //   if (isEmpty(data.confirmPassword)) {
  //     errors.confirmPassword = "Confirm Password field can not be empty";
  //   } else if (!Validator.equals(data.password, data.confirmPassword)) {
  //     errors.confirmPassword = "Password and Confirm Password fields must match";
  //   }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateRegisterInput;
