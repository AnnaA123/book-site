require("dotenv").config();
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const login = async (req, res, done) => {
  try {
    const user = await userModel.findOne({ username: req.body.username });
    if (!user || user === null) {
      return res.status(401).json({ error: "Incorrect username" });
    }
    const val = await bcrypt.compare(req.body.password, user.password);
    if (!val) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const publicUser = user.toObject();
    delete publicUser.password;
    const token = jwt.sign(publicUser, process.env.TOKEN_PW);

    console.log(`User ${user.username} logged in with token ${token}`);
    res.status(200).send({ user, token });
  } catch (err) {
    done(err);
  }
};

module.exports = login;
