const router = require("express").Router();
const {
  getAllUsers,
  getUser,
  addUser,
} = require("../controllers/userController.js");

router.get("/", getAllUsers);

router.post("/", addUser);

router.get("/:id", getUser);

module.exports = router;
