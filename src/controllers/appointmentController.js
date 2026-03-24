const Appointment = require(
  "../models/appointment.model"
);

exports.createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor: req.body.doctor,
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
        .populate("doctor")
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