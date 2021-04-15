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

module.exports = {
  getAllUsers,
  getUser,
};
