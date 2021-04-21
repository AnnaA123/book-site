const jwt = require("jsonwebtoken");
const review = require("../models/reviewModel.js");
const userModel = require("../models/userModel.js");

const userPermission = async (req) => {
  // check if the user has permission to perform an action
  const reviewID = req.params.id;
  const rToken = req.headers.authorization;
  console.log("123RToken: ", rToken);
  const test = rToken.slice(7);
  const token = jwt.verify(test, "test"); // TODO
  console.log("--------------\nbruh ", token);
  const thisReview = await review.findById(reviewID);
  const thisUser = await userModel.findById(token._id);

  /*
  if (thisReview.UserID.toString() === thisUser._id.toString()) {
    console.log("-------------------\nYES CORRECT TOKEN");
    return true;
  } else {
    console.log("-------------------\nNOPE");
    return false;
  }
  */

  return {
    thisReview,
    token,
    thisUser,
    reviewID,
    hasRights: thisReview.UserID.toString() === thisUser._id.toString(),
  };
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
    res.send(await review.findById(req.params.id));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const postReview = async (req, res) => {
  try {
    const post = await review.create({
      BookID: req.body.BookID,
      UserID: req.body.UserID,
      Title: req.body.Title,
      Content: req.body.Content,
    });
    res.send(`review posted: ${post.Title} created with id: ${post._id}`);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const editReview = async (req, res) => {
  const verified = userPermission(req);

  if (verified) {
    try {
      const modify = await review.updateOne(
        { _id: req.params.id },
        { Title: req.params.Title },
        { Content: req.params.Content }
      );
      res.status(200).send(`Review ${modify.Title} updated`);
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
  console.log(
    "!!!!!!!!!!!!!!!!!!!\nIS THERE A TOKEN ",
    req.headers.authorization
  );

  const verified = userPermission(req);

  if (verified.hasRights) {
    try {
      await review.deleteOne({ _id: req.params.id });
      res.send(`review deleted`);
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
