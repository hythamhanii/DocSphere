const Service = require("../models/service.model");
const {
  findDoctorProfileByIdOrUserId,
  findOrCreateDoctorProfileForUser
} = require("../utils/doctorProfile");

exports.createService = async (req, res) => {
  try {
    const doctorProfile =
      req.user?.role === "doctor"
        ? await findOrCreateDoctorProfileForUser(
            req.user._id,
            {
              consultationFee:
                req.body.price
            }
          )
        : await findDoctorProfileByIdOrUserId(
            req.body.doctor
          );

    if (!doctorProfile) {
      return res.status(400).json({
        message: "Doctor profile not found"
      });
    }

    const service = await Service.create({
      doctor: doctorProfile._id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      duration: req.body.duration
    });

    res.status(201).json(service);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getServices = async (req, res) => {
  try {
    const services = await Service.find()
      .populate({
        path: "doctor",
        populate: {
          path: "user specialization"
        }
      });

    res.json(services);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Service deleted"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
