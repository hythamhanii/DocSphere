const mongoose = require("mongoose");

const doctorProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    bio: {
      type: String
    },

    clinicAddress: {
      type: String
    },

    consultationFee: {
      type: Number,
      required: true
    },

    specialization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Specialization"
    },

    experienceYears: {
      type: Number,
      default: 0
    },

    rating: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "DoctorProfile",
  doctorProfileSchema
);