const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

// BookID refers to book in Google Books API

const reviewSchema = new Schema({
  BookID: {
    type: String,
    required: true,
  },
  UserID: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  BookTitle: String,
  Title: String,
  Content: String,
});

reviewSchema.query.byBookID = function (bookID) {
  return this.find({ BookID: new RegExp(bookID, "i") });
};

reviewSchema.query.byUserID = function (userID) {
  if (userID !== undefined) {
    return this.find({ UserID: new ObjectId(userID) });
  } else {
    return this.find();
  }
};

module.exports = mongoose.model("Review", reviewSchema);
