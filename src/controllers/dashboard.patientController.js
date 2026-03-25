const Appointment =
  require("../models/appointment.model");

const Payment =
  require("../models/payment.model");

exports.getPatientStats =
  async (req, res) => {
    try {
      const patientId =
        req.user._id;

      const appointments =
        await Appointment.find({
          patient: patientId
        }).select("status appointmentDate");

      const appointmentIds =
        appointments.map(
          (appointment) => appointment._id
        );

      const totalAppointments =
        appointments.length;

      const completedAppointments =
        appointments.filter(
          (appointment) =>
            appointment.status ===
            "completed"
        ).length;

      const now = new Date();

      const upcomingAppointments =
        appointments.filter(
          (appointment) =>
            ["pending", "confirmed"].includes(
              appointment.status
            ) &&
            appointment.appointmentDate >= now
        ).length;

      const myPayments =
        await Payment.countDocuments({
          appointment: {
            $in: appointmentIds
          }
        });

      res.json({
        totalAppointments,
        completedAppointments,
        upcomingAppointments,
        myPayments
      });

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };

exports.getMyAppointments =
  async (req, res) => {
    try {
      const appointments =
        await Appointment.find({
          patient: req.user._id
        })
          .populate({
            path: "doctor",
            populate: {
              path: "user specialization"
            }
          })
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

exports.cancelAppointment =
  async (req, res) => {
    try {
      const appointment =
        await Appointment.findOneAndUpdate(
          {
            _id: req.params.id,
            patient: req.user._id
          },
          {
            status: "cancelled"
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
