require("dotenv").config();
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const passport = require("passport");

const login = async (req, res, done) => {
  console.log("login start");
  try {
    const user = await userModel.findOne({ username: req.body.username });
    if (!user || user === null) {
      return response.status(401).json({ error: "error 401" });
    }
    const val = await bcrypt.compare(req.body.password, user.password);
    if (!val) {
      return response.status(401).json({ error: "error 401" });
    }

    const publicUser = user.toObject();
    delete publicUser.password;
    const token = jwt.sign(publicUser, process.env.TOKEN_PW); // TODO

    console.log(`User ${user.username} logged in with token ${token}`);
    res.status(200).send({ user, token });
  } catch (err) {
    done(err);
  }
};

module.exports = login;
/*
try {
    const user = await userModel.findOne({ username: req.body.username });
    if (!user || user === null) {
      return response.status(401).json({ error: "error 401" });
    }
    const val = await bcrypt.compare(req.body.password, user.password);
    if (!val) {
      return response.status(401).json({ error: "error 401" });
    }

    const publicUser = user.toObject();
    delete publicUser.password;
    const token = jwt.sign(publicUser, process.env.TOKEN_PW); // TODO

    console.log(`User ${user.username} logged in with token ${token}`);
    res.status(200).send({ user, token });
  } catch (err) {
    done(err);
  }

*/
/*
return new Promise((resolve, reject) => {
    passport.authenticate(
      "local",
      { session: false },
      async (err, user, info) => {
        try {
          if (err || !user) {
            reject(info.message);
          }

          req.login(user, { session: false }, async (err) => {
            if (err) {
              reject(err);
            }

            const token = jwt.sign(user, "test"); // TODO
            console.log(`User ${user.username} logged in with token ${token}`);
            resolve({ user, token });
          });
        } catch (err) {
          reject(info.message);
        }
      }
    )(req, res);
  });
*/
/*
try {
    const user = await userModel.findOne({username: req.body.username});
    if(!user || user === null) {
        return res.status(401).json({ error: 'Create an account'});
    }

    const comparePW = await bcrypt.compare(req.body.password, user.password);
    if (!comparePW) {
      return res.status(401).json({ error: 'Wrong username or password'});
    }


} catch (err) {
  res.status(500).json({ message: err.message });
}
*/
