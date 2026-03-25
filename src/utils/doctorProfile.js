const mongoose = require("mongoose");

const DoctorProfile = require(
  "../models/doctorProfile.model"
);

const isValidObjectId = (value) =>
  mongoose.Types.ObjectId.isValid(value);

const findDoctorProfileByIdOrUserId =
  async (identifier) => {
    if (!identifier || !isValidObjectId(identifier)) {
      return null;
    }

    const doctorProfile =
      await DoctorProfile.findById(identifier);

    if (doctorProfile) {
      return doctorProfile;
    }

    return DoctorProfile.findOne({
      user: identifier
    });
  };

const findOrCreateDoctorProfileForUser =
  async (userId, defaults = {}) => {
    if (!userId || !isValidObjectId(userId)) {
      return null;
    }

    const existingProfile =
      await DoctorProfile.findOne({
        user: userId
      });

    if (existingProfile) {
      return existingProfile;
    }

    return DoctorProfile.create({
      user: userId,
      consultationFee:
        defaults.consultationFee ?? 0,
      bio: defaults.bio,
      clinicAddress:
        defaults.clinicAddress,
      specialization:
        defaults.specialization,
      experienceYears:
        defaults.experienceYears ?? 0
    });
  };

module.exports = {
  findDoctorProfileByIdOrUserId,
  findOrCreateDoctorProfileForUser
};
