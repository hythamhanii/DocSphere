const Review = require("../models/review.model");
const {
  findDoctorProfileByIdOrUserId
} = require("../utils/doctorProfile");

exports.createReview = async (req, res) => {
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

    const review = await Review.create({
      patient: req.user._id,
      doctor: doctorProfile._id,
      rating: req.body.rating,
      comment: req.body.comment
    });

    res.status(201).json(review);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getDoctorReviews = async (req, res) => {
  try {
    const doctorProfile =
      await findDoctorProfileByIdOrUserId(
        req.params.doctorId
      );

    if (!doctorProfile) {
      return res.json([]);
    }

    const reviews = await Review.find({
      doctor: doctorProfile._id
    }).populate("patient");

    res.json(reviews);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
