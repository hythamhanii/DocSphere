const DoctorProfile = require("../models/doctorProfile.model");
const User = require("../models/user.model");

exports.createDoctorProfile = async (req, res) => {
  try {
    const doctor = await DoctorProfile.create({
      user: req.user._id,
      bio: req.body.bio,
      clinicAddress: req.body.clinicAddress,
      consultationFee: req.body.consultationFee,
      specialization: req.body.specialization,
      experienceYears: req.body.experienceYears
    });

    res.status(201).json(doctor);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await DoctorProfile.find()
      .populate("user")
      .populate("specialization");

    res.json(doctors);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await DoctorProfile.findById(
      req.params.id
    )
      .populate("user")
      .populate("specialization");

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found"
      });
    }

    res.json(doctor);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};