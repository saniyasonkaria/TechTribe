const express = require("express");
const app = express();

//request handler
app.use("/test", (req, res) => {
  res.send("Hello, from /test route");
});
app.use("/payment", (req, res) => {
  res.send("Hello, from /payment route");
});

app.use("/", (req, res) => {
  res.send("Hello, from / route");
});

app.listen(7777, () => {
  console.log("server is listening on port 7777...");
});
