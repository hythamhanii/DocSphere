const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
      minlength: 8,
      select: false,
    },

    googleId: String,

    role: {
      type: String,
      enum: ["patient", "doctor", "admin"],
      default: "patient",
    },

    phonePrimary: {
      type: String,
      required: true,
    },

    phoneSecondary: String,

    profileImage: {
      type: String,
      default: "default.png",
    },

    address: String,

    emergencyContact: {
      name: String,
      phone: String,
    },

    gender: {
      type: String,
      enum: ["male", "female"],
    },

    dateOfBirth: Date,

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    emailOTP: {
      type: String,
      select: false,
    },

    emailOTPExpires: {
      type: Date,
      select: false,
    },

    otpAttempts: {
      type: Number,
      default: 0,
      select: false,
    },

    lockUntil: {
      type: Date,
      select: false,
    },

    refreshToken: {
      type: String,
      select: false,
    },

    loginAttempts: {
      type: Number,
      default: 0,
      select: false,
    },

    lastLogin: Date,

    passwordChangedAt: Date,

    passwordResetToken: {
      type: String,
      select: false,
    },

    passwordResetExpires: {
      type: Date,
      select: false,
    },

    isSuspended: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

// Index for soft delete performance
userSchema.index({ email: 1, isDeleted: 1 });

// Auto hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("User", userSchema);