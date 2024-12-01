const mongoose = require("mongoose");
const config = require("../config/config");

const db = config.DATABASE_CONFIG.url;

const connect = async () => {
  const mongodburl = db;

  try {
    await mongoose.connect(mongodburl);
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1); // Exit the process on error
  }
};

module.exports = connect;
