const Payment = require(
  "../models/payment.model"
);

exports.createPayment = async (
  req,
  res
) => {
  try {
    const transactionId =
      "TXN-" +
      Math.floor(Math.random() * 1000000);

    const payment = await Payment.create({
      appointment: req.body.appointment,
      amount: req.body.amount,
      method: req.body.method,
      status: "paid",
      transactionId
    });

    res.status(201).json(payment);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getPayments = async (
  req,
  res
) => {
  try {
    const payments =
      await Payment.find()
        .populate("appointment");

    res.json(payments);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};