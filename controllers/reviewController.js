const review = require("../models/reviewModel.js");

const getAllReviews = async (req, res) => {
  try {
    res.json(await review.find());
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
      ...req.body,
    });
    res.send(`review posted: ${post.Title} created with id: ${post._id}`);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const editReview = async (req, res) => {
  const modify = await review.updateOne(
    { _id: req.params.id },
    { Title: req.params.Title },
    { Content: req.params.Content }
  );
  res.status(200).send(`Review ${modify.Title} updated`);
};

const deleteReview = async (req, res) => {
  try {
    await review.deleteOne({ _id: req.params.id });
    res.send(`review deleted`);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllReviews,
  getReview,
  postReview,
  editReview,
  deleteReview,
};
