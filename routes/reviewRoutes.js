const router = require("express").Router();
const {
  getAllReviews,
  postReview,
} = require("../controllers/reviewController.js");

router.get("/", getAllReviews);

router.post("/", postReview);

module.exports = router;
