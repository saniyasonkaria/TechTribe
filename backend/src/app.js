const express = require("express");
const connectDB = require("./config/database");
const UserModel = require("./models/userModel");
const app = express();

//request handler
app.use(express.json()); //adding json middleware to read json format data

app.post("/sighup", async (req, res) => {
  console.log(req.body);
  // create a instance of user model
  const user = new UserModel(req.body);
  try {
    await user.save(); // user is saved in database through mongoose's .save() method
    res.send("user is created successfully!");
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
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
