const express = require("express");
const profileRoute = express.Router();
const { userAuth } = require("../middlewares/auth");

profileRoute.get("/profile", userAuth, async (req, res) => {
  try {
    //fetch user profile from database
    res.send("user profile data" + req.user);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});

module.exports = profileRoute;
