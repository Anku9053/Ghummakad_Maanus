const jwt = require("jsonwebtoken");
const user = require("../models/user");

const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "User is not authenticated" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.TOKENKEY);
    req.user = decoded; // Attach the decoded user information to the request object
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid Token" });
  }
};

const isAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "User is not authenticated" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.TOKENKEY);
    const foundUser = await user.findOne({ email: decoded.email });

    if (!foundUser) {
      return res.status(404).json({ msg: "User does not exist" });
    }

    if (!foundUser.is_admin) {
      return res.status(403).json({ msg: "User is not admin" });
    }

    req.user = decoded; // Attach the decoded user information to the request object
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid Token" });
  }
};

module.exports = { isAdmin, isAuthenticated };
