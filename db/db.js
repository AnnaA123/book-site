const mongoose = require("mongoose");

// Currently connects to chargemap db
(async () => {
  try {
    await mongoose.connect(process.env.BOOKDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected successfully");
  } catch (err) {
    console.error("Connection to db failed", err);
  }
})();

module.exports = mongoose.connection;
