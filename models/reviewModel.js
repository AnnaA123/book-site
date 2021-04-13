const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  BookID: String,
  Title: String,
  Content: String,
});

module.exports = mongoose.model("Review", reviewSchema);
