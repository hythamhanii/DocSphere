const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        // في النسخ الجديدة من Mongoose، مجرد تمرير URI كفاية
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection failed:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;