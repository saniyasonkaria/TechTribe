const express = require("express");
const profileRoute = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateProfileEditData } = require("../utils/validate");
const bcrypt = require("bcrypt");

profileRoute.get("/profile/view", userAuth, async (req, res) => {
  try {
    //fetch user profile from database
    res.send(req.user);
  } catch (err) {
    console.error(err);
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
      (key) => (loggedInUser[key] = editFields[key])
    );

    await loggedInUser.save();
    res.send(loggedInUser);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
});

profileRoute.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { currPassword, newPassword } = req.body;
    const loggedInUser = req.user;

    const match = await bcrypt.compare(currPassword, loggedInUser.password);
    if (!match) {
      throw new Error("Invalid Credential!!");
    }
    const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
    loggedInUser.password = hashedNewPassword;
    loggedInUser.save();
    res.send(`${loggedInUser.firstName}'s password is Updated!!`);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
});

module.exports = profileRoute;
