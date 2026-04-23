const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
    },

    googleId: {
      type: String,
    },

    role: {
      type: String,
      enum: ["patient", "doctor", "admin"],
      default: "patient",
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    emailOTP: String,
    emailOTPExpires: Date,

    otpAttempts: {
      type: Number,
      default: 0,
    },

    lockUntil: Date,

    refreshToken: String,

    isSuspended: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);