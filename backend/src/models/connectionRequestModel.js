const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["accepted", "ignored", "interested", "rejected"],
        message: "Status is not valid !",
      },
    },
  },
  { timestamps: true }
);
// to avoid duplicate connection request between two users in any direction
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }); //compound index

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("You cannot send connection request to yourself!");
  }
  next();
});

const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequestModel;
