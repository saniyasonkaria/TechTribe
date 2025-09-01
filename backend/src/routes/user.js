const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequestModel");

const USER_DATA = "firstName lastName age gender photoUrl about skills";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_DATA);

    res.json({
      message: `Connection Requests found for ${loggedInUser.firstName}!`,
      data: connectionRequest,
    });
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
});

module.exports = userRouter;
