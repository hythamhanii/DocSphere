const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const {
  findOrCreateDoctorProfileForUser
} = require("../utils/doctorProfile");

exports.register = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      role
    } = req.body;

    const userExists = await User.findOne({
      email
    });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role
    });

    if (user.role === "doctor") {
      await findOrCreateDoctorProfileForUser(
        user._id
      );
    }

    res.status(201).json({
      token: generateToken(user),
      user
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    if (user.role === "doctor") {
      await findOrCreateDoctorProfileForUser(
        user._id
      );
    }

    res.json({
      token: generateToken(user),
      user
    });
  } catch (error) {
    next(error);
  }
};
