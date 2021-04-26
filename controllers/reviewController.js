require("dotenv").config();
const jwt = require("jsonwebtoken");
const review = require("../models/reviewModel.js");
const userModel = require("../models/userModel.js");

const userPermission = async (req) => {
  // check if the user has permission to perform an action
  const reviewID = req.params.id;
  const rToken = req.headers.authorization;
  if (rToken === undefined) {
    return false;
  } else {
    const sToken = rToken.slice(7);
    const token = jwt.verify(sToken, process.env.TOKEN_PW);
    const thisReview = await review.findById(reviewID);
    const thisUser = await userModel.findById(token._id);

    if (thisReview.UserID.toString() === thisUser._id.toString()) {
      return true;
    } else {
      return false;
    }
  }
};

const getAllReviews = async (req, res) => {
  try {
    res.json(
      await review.find().byBookID(req.query.book).byUserID(req.query.user)
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getReview = async (req, res) => {
  try {
    const r = await review.findById(req.params.id);
    res.status(200).json(r);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const postReview = async (req, res) => {
  // first check if the user is logged in
  const rToken = req.headers.authorization;
  if (rToken === undefined) {
    res.status(401).json({ error: "You need to be logged in." });
  } else {
    const sToken = rToken.slice(7);
    const token = jwt.verify(sToken, process.env.TOKEN_PW);
    const thisUser = await userModel.findById(token._id);

    try {
      const post = await review.create({
        BookID: req.body.BookID,
        UserID: thisUser._id,
        BookTitle: req.body.BookTitle,
        Title: req.body.Title,
        Content: req.body.Content,
      });
      res.json({ message: `Review ${post.Title} created` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

const editReview = async (req, res) => {
  const verified = await userPermission(req);

  if (verified) {
    try {
      console.log("--------------\n", JSON.stringify(req.body));
      await review.updateOne(
        { _id: req.params.id },
        { Content: req.body.Content }
      );
      res
        .status(200)
        .send(`Review ${req.body.Title} updated: ${req.body.Content}`);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res
      .status(401)
      .json({ error: "You do not have the rights to edit this review." });
  }
};

const deleteReview = async (req, res) => {
  const verified = await userPermission(req);
  if (verified) {
    try {
      await review.deleteOne({ _id: req.params.id });
      res.json({ message: "Review deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res
      .status(401)
      .json({ error: "You do not have the rights to delete this review." });
  }
};

module.exports = {
  getAllReviews,
  getReview,
  postReview,
  editReview,
  deleteReview,
};
