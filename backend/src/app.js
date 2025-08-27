const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database");
const User = require("./models/userModel");
const app = express();
const validateSignupData = require("./utils/validate");
const bcrypt = require("bcrypt");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

//request handler
app.use(express.json()); //adding json middleware to read json format data
app.use(cookieparser()); //adding cookie parser middleware to read cookies

app.post("/signup", async (req, res) => {
  try {
    //Never trust the req.body, always validate the data before using it
    validateSignupData(req.body);
    const { firstName, lastName, emailId, password } = req.body;
    //encrypt the password - later
    const hashedPassword = bcrypt.hashSync(password, 10);
    // create a instance of user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });
    await user.save(); // user is saved in database through mongoose's .save() method
    res.send("user is created successfully!");
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Email : Invalid Credentials!!");
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      //create a cookie with the help of jwt
      var jwtToken = await jwt.sign({ _id: user._id }, "secretKey", {
        expiresIn: "7d",
      }); //60, "2 days", "10h", "7d".(60 means 60ms)
      //send the token in the cookie
      res.cookie("token", jwtToken, {
        expires: new Date(Date.now() + 7*24*3600000), //1000 means 1 minute, 3600000 means lh, 24*3600000 means 1d
      }); //cookie will be removed after the 8 hours
      //send success response
      res.send("Login successfully!!");
    } else {
      throw new Error(" password Invalid Credentials!!");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    //fetch user profile from database
    res.send("user profile data" + req.user);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});
app.post("/sendRequest", userAuth, async (req, res) => {
  try {
    res.send(req.user.firstName + " sent the request !!");
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});

//connect to database
const mongoUri = process.env.MONGO_URI || null;
connectDB(mongoUri)
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
