const router = require("express").Router();
const {
  getAllReviews,
  postReview,
  getReview,
  deleteReview,
} = require("../controllers/reviewController.js");

router.get("/", getAllReviews);

router.post("/", postReview);

router.get("/:id", getReview);

router.delete("/:id", deleteReview);

module.exports = router;
