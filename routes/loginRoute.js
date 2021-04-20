const router = require("express").Router();
const { getAllUsers } = require("../controllers/userController.js");

router.get("/", getAllUsers);

module.exports = router;
