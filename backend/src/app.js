const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/userModel");
const app = express();

//request handler
app.use(express.json()); //adding json middleware to read json format data
app.get("/user", async (req, res) => {
  try {
    const user = await User.find({ emailId: req.body.emailId });
    if (user.length == 0) {
      res.status(404).send("User not found !!");
    } else {
      res.send(user);
    }
  } catch {
    res.status(400).send("Something went wrong !!");
  }
});
app.get("/feed", async (req, res) => {
  try {
    const feeds = await User.find();
    res.send(feeds);
  } catch {
    res.status(400).send("Something went wrong !!");
  }
});
app.delete("/user", async (req, res) => {
  try {
    const userId = req.body.userId; //retrieving userID form the req body
    await User.findByIdAndDelete(userId); //deleting user by id
    res.send("User is deleted successfully !!");
  } catch {
    res.status(400).send("Something went wrong !!");
  }
});
app.patch("/user/:userId", async (req, res) => {
  try {
    const userId = req.params?.userId;
    const allowedUpdates = [
      "firstName",
      "lastName",
      "password",
      "age",
      "gender",
      "photoUrl",
    ];
    const isAllowedUpdate = Object.keys(req.body).every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isAllowedUpdate) {
      throw new Error("You tried to update the not allowed fields!");
    }
    const user = await User.findOneAndUpdate(
      { _id: userId },
      req.body,
      { returnDocument: "after" },
      { runValidators: true }
    );
    res.send(user, " User updated successfully !!");
  } catch (err) {
    res.status(400).send("User update failed !" + err.message);
  }
});

app.post("/signup", async (req, res) => {
  console.log(req.body);
  // create a instance of user model
  const user = new User(req.body);
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
