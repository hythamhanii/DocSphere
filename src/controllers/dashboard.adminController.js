const User = require("../models/user.model");
const Appointment = require("../models/appointment.model");
const Service = require("../models/service.model");
const Payment = require("../models/payment.model");

exports.getAdminStats = async (req, res) => {
  try {
    const totalDoctors =
      await User.countDocuments({
        role: "doctor"
      });

    const totalPatients =
      await User.countDocuments({
        role: "patient"
      });

    const totalAppointments =
      await Appointment.countDocuments();

    const totalServices =
      await Service.countDocuments();

    const totalPayments =
      await Payment.countDocuments();

    res.json({
      totalDoctors,
      totalPatients,
      totalAppointments,
      totalServices,
      totalPayments
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getRecentAppointments =
  async (req, res) => {
    try {
      const appointments =
        await Appointment.find()
          .populate("doctor")
          .populate("patient")
          .sort({ createdAt: -1 })
          .limit(5);

      res.json(appointments);

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };

exports.getRecentPayments =
  async (req, res) => {
    try {
      const payments =
        await Payment.find()
          .populate("appointment")
          .sort({ createdAt: -1 })
          .limit(5);

      res.json(payments);

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };
