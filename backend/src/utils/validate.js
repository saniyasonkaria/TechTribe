const validator = require("validator");

const validateSignupData = (data) => {
  console.log(data);
  if (!data.firstName || data.firstName.trim() === "") {
    throw new Error("First name must not be empty");
  } else if (data.firstName.length < 3 || data.firstName.length > 30) {
    throw new Error("First name must be between 3 and 30 characters");
  }

  if (!data.lastName || data.lastName.trim() === "") {
    throw new Error("Last name must not be empty");
  }

  if (!data.emailId || data.emailId.trim() === "") {
    throw new Error("Email must not be empty");
  } else if (!validator.isEmail(data.emailId)) {
    throw new Error("Email address is invalid");
  }

  if (!data.password || data.password.trim() === "") {
    throw new Error("Password must not be empty");
  } else if (!validator.isStrongPassword(data.password)) {
    throw new Error("Please enter a strong password !!");
  }

  if (data.age && (isNaN(data.age) || data.age < 12)) {
    throw new Error("Age must be a number and at least 12");
  }
};

const validateProfileEditData = (req) => {
  const allowedFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];
  return Object.keys(req.body).every((field) => allowedFields.includes(field));
};
module.exports = { validateSignupData, validateProfileEditData };
