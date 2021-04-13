const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  BookID: {
    type: mongoose.Types.ObjectId,
    ref: Book,
  },
  Title: String,
  Content: {
    type: String,
  },
});

module.exports = mongoose.model("Review", reviewSchema);
