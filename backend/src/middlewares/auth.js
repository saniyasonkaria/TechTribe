const adminAuth = (req, res, next) => {
  const token = "xyz";
  if (token != "xyz") {
    res.status(403).send("Admin access denied");
  } else {
    next();
  }
};
const userAuth = (req, res, next) => {
  const token = "xyzoo";
  if (token != "xyz") {
    res.status(403).send("User access denied");
  } else {
    next();
  }
};
module.exports = { adminAuth, userAuth };
