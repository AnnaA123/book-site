const passport = require("passport");
const { Strategy } = require("passport-local");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

//login
passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const user = await userModel.findOne({ username });
      if (user === null) {
        return done(null, false, { message: "Wrong username." });
      }
      const val = await bcrypt.compare(password, user.password);
      if (!val) {
        return done(null, false, { message: "Wrong password." });
      }

      const publicUser = user.toObject();
      delete publicUser.password;
      return done(null, publicUser, { message: "Logged in." });
    } catch (e) {
      return done(e);
    }
  })
);

module.exports = passport;