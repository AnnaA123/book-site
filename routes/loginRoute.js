const router = require("express").Router();
const login = require("../passport/auth.js");

router.post("/", login);

module.exports = router;
