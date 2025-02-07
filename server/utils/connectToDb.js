require("dotenv").config();
const mongoose = require("mongoose");

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

module.exports = {connectToDb};