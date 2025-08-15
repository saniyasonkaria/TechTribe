const express = require("express");
const connectDB = require("./config/database");
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

//connect to database
connectDB()
  .then(() => {
    console.log("Database connected successfully");
    // Start the server only after successful database connection
    app.listen(7777, () => {
      console.log("server is listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
