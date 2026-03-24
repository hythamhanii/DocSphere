const User = require("../models/user.model");
const Appointment = require(
  "../models/appointment.model"
);
const Payment = require(
  "../models/payment.model"
);

exports.getStats = async (req, res) => {
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

    const revenue =
      await Payment.aggregate([
        {
          $group: {
            _id: null,
            total: {
              $sum: "$amount"
            }
          }
        }
      ]);

    res.json({
      totalDoctors,
      totalPatients,
      totalAppointments,
      revenue:
        revenue[0]?.total || 0
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};