const mongoose = require("mongoose");
// const config = require("config");
const logger = require("../logger/pino");

const connect = async () => {
  // const mongodburl = config.get("mongodburl");
  const mongodburl = "mongodb+srv://fastfood:fastfood123@cluster0.cpbc4ky.mongodb.net/Linked?retryWrites=true&w=majority";

  return await mongoose.connect(mongodburl)
    .then(() => {
        logger.info("Database connected");
    })
    .catch((error) => {
      logger.error("db error:", error.message);
      process.exit(1);
    });
};

module.exports = connect;
