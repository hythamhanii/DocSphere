const Appointment =
  require("../models/appointment.model");

exports.getDoctorStats =
  async (req, res) => {
    try {
      const doctorId =
        req.user._id;

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
      const appointments =
        await Appointment.find({
          doctor: req.user._id
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
      const appointment =
        await Appointment.findByIdAndUpdate(
          req.params.id,
          {
            status: req.body.status
          },
          { new: true }
        );

      res.json(appointment);

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };

  // Task Mahmoud