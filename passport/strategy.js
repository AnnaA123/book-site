// currently not in use, couldn't quite get it to work

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
    console.log("help");
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
/* // TODO TOKEN STUFF

passport.use(
  new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: "password", // CHANGE LATER
  },
  async (jwtPayload, done) => {
      try {
          
      } catch (err) {
          return done(null, false)
      }
  } 
  )
);
*/
module.exports = passport;
