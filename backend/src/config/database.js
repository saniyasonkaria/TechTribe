const mongoose = require("mongoose");

const connectDB = async (uri) => {
    console.log("Connecting to MongoDB...");
  await mongoose.connect(uri);
};
module.exports = connectDB;
