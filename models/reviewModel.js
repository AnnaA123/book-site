const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// BookID refers to book in Google Books API

const reviewSchema = new Schema({
  BookID: String,
  UserID: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    // required: true,
  },
  Title: String,
  Content: String,
});

reviewSchema.query.byBookID = function (bookID) {
  return this.find({ BookID: new RegExp(bookID, "i") });
};

reviewSchema.query.byUserID = function (userID) {
  return this.find({ UserID: new RegExp(userID, "i") });
};

module.exports = mongoose.model("Review", reviewSchema);
