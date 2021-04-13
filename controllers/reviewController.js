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
    res.send(reviews.filter((review) => review === req.params.id));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const postReview = async (req, res) => {
  try {
    const post = await reviews.create({
      BookID: req.body.Book,
      Title: req.body.Title,
      Content: req.body.Content,
    });
    res.send(`review posted: ${post.title} created with id: ${post._id}`);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllReviews,
  getReview,
  postReview,
};
