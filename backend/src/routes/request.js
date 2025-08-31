const express = require("express");

const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

requestRouter.post("/sendRequest", userAuth, async (req, res) => {
  try {
    res.send(req.user.firstName + " sent the request !!");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
});
module.exports = requestRouter;
