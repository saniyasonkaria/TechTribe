const express = require("express");
const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth");

//request handler
app.get("/admin", adminAuth, (req, res) => {
  res.send("Sending admin data");
});
app.delete("/admin", adminAuth, (req, res) => {
  res.send("Deleted all admin data");
});

app.get("/user/login", (req, res) => {
  res.send("user Logged in successfully");
});
app.get("/user", userAuth, (req, res) => {
  res.send("Sending user data");
});
app.post("/user", userAuth, (req, res) => {
  res.send("Posting user data");
});
app.listen(7777, () => {
  console.log("server is listening on port 7777...");
});
