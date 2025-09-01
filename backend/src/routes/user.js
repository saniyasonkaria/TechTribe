const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequestModel");
const User = require("../models/userModel");

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

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_DATA)
      .populate("toUserId", USER_DATA);

    const data = connectionRequest.map((row) => {
      if (loggedInUser._id.toString() == row.fromUserId._id.toString()) {
        return row.toUserId;
      } else return row.fromUserId;
    });
    res.json({
      message: `All Connections found for ${loggedInUser.firstName}!`,
      data,
    });
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      $or: [{ toUserId: loggedInUser._id }, { fromUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");
    const hideUser = new Set();
    connectionRequest.forEach((req) => {
      hideUser.add(req.toUserId.toString());
      hideUser.add(req.fromUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUser) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    }).select(USER_DATA);

    res.json({ message: "Fetched feed users!!", data: users });
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
});

module.exports = userRouter;
