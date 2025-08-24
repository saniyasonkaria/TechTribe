const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  lastName: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 12,
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "other"].includes(value.toLowerCase())) {
       throw new Error ("Gender could be male, female or other");
      }
    },
  },
  photoUrl: {
    type: String,
    default: "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png",
  },
},{ timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
