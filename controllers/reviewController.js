const reviews = require("../models/reviewModel.js");

const getAllReviews = async (req, res) => {
  try {
    res.json(await reviews.find());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getReview = async (req, res) => {
  try {
    res.send(await reviews.findById(req.params.id));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const postReview = async (req, res) => {
  try {
    const post = await reviews.create({
      ...req.body,
    });
    res.send(`review posted: ${post.Title} created with id: ${post._id}`);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    await reviews.deleteOne({ _id: req.params.id });
    res.send(`review deleted`);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllReviews,
  getReview,
  postReview,
  deleteReview,
};
