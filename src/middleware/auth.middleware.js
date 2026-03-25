const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization) {
    const authHeader =
      req.headers.authorization.trim();

    token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;
  }

  if (!token) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    res.status(401).json({
      message: "Token failed"
    });
  }
};

module.exports = protect;
