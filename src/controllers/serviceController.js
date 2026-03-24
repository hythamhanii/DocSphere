const Service = require("../models/service.model");

exports.createService = async (req, res) => {
  try {
    const service = await Service.create({
      doctor: req.body.doctor,
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
      .populate("doctor");

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