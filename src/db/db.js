require('dotenv').config();
const mongoose = require('mongoose');


const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log(`✅ MongoDB connected Sucessfully!`);
  } catch (error) {
    console.error("❌ MongoDB connection error", error);
    console.error("Error details:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
