const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// BookID refers to book in Google Books API

const reviewSchema = new Schema({
  BookID: String,
  UserID: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Title: String,
  Content: String,
});

module.exports = mongoose.model("Review", reviewSchema);
