const users = require("../models/userModel.js");

const getAllUsers = async (req, res) => {
  try {
    res.json(await reviews.find());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
};
