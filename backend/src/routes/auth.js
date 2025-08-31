const express = require("express");
const User = require("../models/userModel");
const { validateSignupData } = require("../utils/validate");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    //Never trust the req.body, always validate the data before using it
    validateSignupData(req.body);
    const { firstName, lastName, emailId, password } = req.body;
    //encrypt the password - later
    const hashedPassword = bcrypt.hashSync(password, 10);
    // create a instance of user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });
    await user.save(); // user is saved in database through mongoose's .save() method
    res.send("user is created successfully!");
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Email : Invalid Credentials!!");
    }

    const match = await user.validatePassword(password);
    if (match) {
      //create a cookie with the help of jwt
      var jwtToken = await user.getJWT();
      //send the token in the cookie
      res.cookie("token", jwtToken, {
        expires: new Date(Date.now() + 7 * 24 * 3600000), //1000 means 1 minute, 3600000 means lh, 24*3600000 means 1d
      }); //cookie will be removed after the 8 hours
      //send success response
      res.send("Login successfully!!");
    } else {
      throw new Error(" password Invalid Credentials!!");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("User Logout Successfully!!");
});

module.exports = authRouter;
