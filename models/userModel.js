const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
});

module.exports = mongoose.model("User", userSchema);
