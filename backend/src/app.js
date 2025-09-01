const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database");
const app = express();
const cookieparser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRoute = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

//request handler
app.use(express.json()); //adding json middleware to read json format data
app.use(cookieparser()); //adding cookie parser middleware to read cookies

app.use("/", authRouter);
app.use("/", profileRoute);
app.use("/", requestRouter);
app.use("/", userRouter);

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
