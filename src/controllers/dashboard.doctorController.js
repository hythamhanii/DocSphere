const Appointment =
  require("../models/appointment.model");
const {
  findDoctorProfileByIdOrUserId
} = require("../utils/doctorProfile");

exports.getDoctorStats =
  async (req, res) => {
    try {
      const doctorProfile =
        await findDoctorProfileByIdOrUserId(
          req.user._id
        );

      if (!doctorProfile) {
        return res.json({
          totalAppointments: 0,
          pendingAppointments: 0,
          completedAppointments: 0
        });
      }

      const doctorId =
        doctorProfile._id;

      const totalAppointments =
        await Appointment.countDocuments({
          doctor: doctorId
        });

      const pendingAppointments =
        await Appointment.countDocuments({
          doctor: doctorId,
          status: "pending"
        });

      const completedAppointments =
        await Appointment.countDocuments({
          doctor: doctorId,
          status: "completed"
        });

      res.json({
        totalAppointments,
        pendingAppointments,
        completedAppointments
      });

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };

exports.getDoctorAppointments =
  async (req, res) => {
    try {
      const doctorProfile =
        await findDoctorProfileByIdOrUserId(
          req.user._id
        );

      if (!doctorProfile) {
        return res.json([]);
      }

      const appointments =
        await Appointment.find({
          doctor: doctorProfile._id
        })
          .populate("patient")
          .populate("service")
          .sort({
            appointmentDate: 1
          });

      res.json(appointments);

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };

exports.updateAppointmentStatus =
  async (req, res) => {
    try {
      const doctorProfile =
        await findDoctorProfileByIdOrUserId(
          req.user._id
        );

      if (!doctorProfile) {
        return res.status(404).json({
          message: "Doctor profile not found"
        });
      }

      const appointment =
        await Appointment.findOneAndUpdate(
          {
            _id: req.params.id,
            doctor: doctorProfile._id
          },
          {
            status: req.body.status
          },
          { new: true }
        );

      if (!appointment) {
        return res.status(404).json({
          message: "Appointment not found"
        });
      }

      res.json(appointment);

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };

  // Task Mahmoud
