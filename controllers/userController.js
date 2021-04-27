require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel.js");
let saltRounds = 10;

const userPermission = async (req) => {
  // check if the user has permission to perform an action
  const rToken = req.headers.authorization;
  if (rToken === undefined) {
    return false;
  } else {
    const sToken = rToken.slice(7);
    const token = jwt.verify(sToken, process.env.TOKEN_PW);
    const thisUser = await userModel.findById(token._id);

    if (req.params.id.toString() === thisUser._id.toString()) {
      return true;
    } else {
      return false;
    }
  }
};

const getAllUsers = async (req, res) => {
  try {
    res.json(await userModel.find());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const thisUser = await userModel.findById(req.params.id);
    const sUser = {
      _id: thisUser._id,
      username: thisUser.username,
      email: thisUser.email,
      description: thisUser.description,
    };
    res.status(200).json(sUser);
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
      description: req.body.description,
    };
    let newUser = new userModel(req.user);
    const savedUser = await newUser.save();
    delete savedUser.password;
    const usr = {
      username: savedUser.username,
    };
    res.json({ message: `User created`, usr });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const editUser = async (req, res) => {
  const verified = await userPermission(req);

  if (verified) {
    try {
      await userModel.updateOne(
        { _id: req.params.id },
        { description: req.body.description }
      );
      res.status(200).json({
        message: `Description updated`,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res
      .status(401)
      .json({ error: "You do not have the rights to edit this review." });
  }
};

const deleteUser = async (req, res) => {
  const verified = await userPermission(req);

  if (verified) {
    try {
      await userModel.deleteOne({ _id: req.params.id });
      res.json({ message: "User deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(401).json({ error: "You cannot delete this user." });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  editUser,
  deleteUser,
};
