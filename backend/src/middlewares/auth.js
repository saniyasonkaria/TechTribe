const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token is not valid! Login again");
    }
    const { _id } = jwt.verify(token, "secretKey");
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found!");
    }
    req.user = user;
    next();
    
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};
module.exports = {userAuth };
