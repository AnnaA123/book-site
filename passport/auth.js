const jwt = require("jsonwebtoken");
const passport = require("passport");
const userModel = require("../models/userModel");

const login = (req, res, done) => {
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

            const token = jwt.sign(user, ""); // TODO
            resolve({ user, token });
          });
        } catch (err) {
          reject(info.message);
        }
      }
    )(req, res);
  });
};
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
module.exports = login;
