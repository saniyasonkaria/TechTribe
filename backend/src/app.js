const express = require("express");
const app = express();

//request handler
app.use("/user", (req, res) => {
  try {
    throw new Error("User not found");
    res.send("Sending admin data");
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});
app.use("/", (err, req, res, next) => {
  console.log(err);
  res.status(500).send("Something went wrong");
});

app.listen(7777, () => {
  console.log("server is listening on port 7777...");
});
