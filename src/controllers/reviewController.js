const Review = require("../models/review.model");

exports.createReview = async (req, res) => {
  try {
    const review = await Review.create({
      patient: req.user._id,
      doctor: req.body.doctor,
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
    const reviews = await Review.find({
      doctor: req.params.doctorId
    }).populate("patient");

    res.json(reviews);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};