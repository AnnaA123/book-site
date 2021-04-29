
//require("dotenv").config();
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

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

const checkAuth = (req, res) => {
  // check if the user has permission to perform an action
  return new Promise((resolve, reject) => {
    const reviewID = req.params.id;
    const rToken = req.headers.authorization;
    if (rToken === undefined) {
      resolve(false);
    } else {
      const sToken = rToken.slice(7);
      const token = jwt.verify(sToken, process.env.TOKEN_PW);
      const thisReview = await reviewModel.findById(reviewID);
      const thisUser = await userModel.findById(token._id);

      if (thisReview.UserID.toString() === thisUser._id.toString()) {
        resolve(true);
      } else {
        resolve(false);
      }
    }
  })
  
};

export { login, checkAuth };

