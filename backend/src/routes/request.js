const express = require("express");
const ConnectionRequest = require("../models/connectionRequestModel");
const User = require("../models/userModel");

const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      //check the status is either "interested" or "ignored"
      const isStatusValid = ["interested", "ignored"].includes(status);
      if (!isStatusValid) {
        throw new Error(`${status}, is not valid status for sending request!`);
      }

      //check if toUserId is fromUserId, means user is sending connection request to himself
      if (fromUserId.toString() === toUserId.toString()) {
        throw new Error("You cannot send connection request to yourself!");
      }
      const fromUser = await User.findById(fromUserId);
      // check toUser is exist or not in UserSchema
      const toUser = await User.findById(toUserId);
      console.log("toUser", toUser);
      if (!toUser) {
        throw new Error("Invalid Request Receiver!!");
      }
      // check the toUserId and fromUserId is exist in connectionRequest collection
      const existConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existConnectionRequest) {
        throw new Error("Connection Request exists already!");
      }
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      connectionRequest.save();

      res.send(
        `${fromUser.firstName} has sent ${status} request to ${toUser.firstName}!!`
      );
    } catch (err) {
      console.error(err);
      res.status(400).send(err.message);
    }
  }
);
module.exports = requestRouter;
