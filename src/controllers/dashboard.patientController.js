const Appointment =
  require("../models/appointment.model");

const Payment =
  require("../models/payment.model");

exports.getPatientStats =
  async (req, res) => {
    try {
      const patientId =
        req.user._id;

      const myAppointments =
        await Appointment.countDocuments({
          patient: patientId
        });

      const myPayments =
        await Payment.countDocuments({
          patient: patientId
        });

      res.json({
        myAppointments,
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
          .populate("doctor")
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
        await Appointment.findByIdAndUpdate(
          req.params.id,
          {
            status: "cancelled"
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