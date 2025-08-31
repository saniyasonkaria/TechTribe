const express = require("express");
const profileRoute = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateProfileEditData } = require("../utils/validate");

profileRoute.get("/profile/view", userAuth, async (req, res) => {
  try {
    //fetch user profile from database
    res.send("user profile data" + req.user);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});

profileRoute.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileEditData(req)) {
      throw new Error("Profile Edit data is not valid!!");
    }
    const loggedInUser = req.user;
    const editFields = req.body;
    console.log(loggedInUser);
    Object.keys(req.body).forEach(
      (key) => loggedInUser[key] = editFields[key]
    );

    await loggedInUser.save();
    console.log(loggedInUser);
    res.send("Profile Edited Successfully!!");
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});

module.exports = profileRoute;
