const bcrypt = require("bcrypt");
const saltRounds = 10;
const user = require("../models/userModel.js");

const getAllUsers = async (req, res) => {
  try {
    res.json(await user.find());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    res.send(await user.findById(req.params.id));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addUser = async (req, res) => {
  try {
    const pw = await bcrypt.hash(req.body.password, saltRounds);
    req.user = {
      username: req.body.username,
      password: pw,
      email: req.body.email,
    };
    let newUser = new user(req.user);
    const savedUser = await newUser.save();
    delete savedUser.password;
    const usr = {
      username: savedUser.username,
      email: savedUser.email,
    };
    console.log("!!!user: ", usr);
    res.json({ message: `User created`, usr });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  addUser,
};
