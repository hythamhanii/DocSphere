const Specialization = require(
  "../models/specialization.model"
);

exports.createSpecialization =
  async (req, res) => {
    try {
      const specialization =
        await Specialization.create({
          name: req.body.name,
          description:
            req.body.description
        });

      res.status(201).json(
        specialization
      );

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };

exports.getSpecializations =
  async (req, res) => {
    try {
      const list =
        await Specialization.find();

      res.json(list);

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };

  // Task Mahmoud