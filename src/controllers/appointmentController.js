const Appointment = require(
  "../models/appointment.model"
);
const {
  findDoctorProfileByIdOrUserId
} = require("../utils/doctorProfile");

exports.createAppointment = async (req, res) => {
  try {
    const doctorProfile =
      await findDoctorProfileByIdOrUserId(
        req.body.doctor
      );

    if (!doctorProfile) {
      return res.status(400).json({
        message: "Doctor profile not found"
      });
    }

    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor: doctorProfile._id,
      service: req.body.service,
      appointmentDate:
        req.body.appointmentDate,
      notes: req.body.notes
    });

    res.status(201).json(appointment);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getMyAppointments = async (
  req,
  res
) => {
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
        .populate("service");

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
        await Appointment.findOneAndUpdate(
          {
            _id: req.params.id,
            patient: req.user._id
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
