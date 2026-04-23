const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const generateOTP = require("../utils/generateOTP");
const { 
  generateAccessToken,
  generateRefreshToken 
} = require("../utils/generateToken");
// =========================register===========================
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 12);

    const otp = generateOTP();

    await User.create({
      name,
      email,
      password: hashed,
      emailOTP: otp,
      emailOTPExpires: Date.now() + 10 * 60 * 1000,
    });

    res.status(201).json({
      message: "Registered successfully. Verify your email.",
    });

  } catch (err) {
    next(err);
  }
};


// Verify Email + Resend Protection
exports.verifyEmail = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.lockUntil && user.lockUntil > Date.now()) {
    return res.status(403).json({ message: "Account locked. Try later." });
  }

  if (user.emailOTP !== otp || user.emailOTPExpires < Date.now()) {
    user.otpAttempts += 1;

    if (user.otpAttempts >= 5) {
      user.lockUntil = Date.now() + 15 * 60 * 1000;
    }

    await user.save();

    return res.status(400).json({ message: "Invalid OTP" });
  }

  user.isEmailVerified = true;
  user.emailOTP = undefined;
  user.otpAttempts = 0;

  await user.save();

  res.json({ message: "Email verified successfully" });
};


//=============login=============
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, isDeleted: false });

    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isEmailVerified)
      return res.status(403).json({ message: "Verify email first" });

    if (user.isSuspended)
      return res.status(403).json({ message: "Account suspended" });

    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.json({ accessToken, refreshToken });

  } catch (err) {
    next(err);
  }
};


//Refresh Token Endpoint
exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken)
      return res.status(401).json({ message: "Refresh token required" });

    const user = await User.findOne({ refreshToken });

    if (!user)
      return res.status(403).json({ message: "Invalid refresh token" });

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = generateAccessToken(user);

    res.json({ accessToken: newAccessToken });

  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

//==============logout===============
exports.logout = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    user.refreshToken = null;
    await user.save();

    res.json({ message: "Logged out successfully" });

  } catch (err) {
    next(err);
  }
};