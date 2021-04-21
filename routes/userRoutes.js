const router = require("express").Router();
const {
  getAllUsers,
  getUser,
  addUser,
  deleteUser,
} = require("../controllers/userController.js");

router.get("/", getAllUsers);

router.post("/", addUser);

router.get("/:id", getUser);

router.delete("/:id", deleteUser);

module.exports = router;
