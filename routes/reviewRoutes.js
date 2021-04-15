const router = require("express").Router();
const {
  getAllReviews,
  postReview,
  getReview,
  editReview,
  deleteReview,
} = require("../controllers/reviewController.js");

router.get("/", getAllReviews);

router.post("/", postReview);

router.get("/:id", getReview);

router.get("/:id", editReview);

router.delete("/:id", deleteReview);

module.exports = router;
