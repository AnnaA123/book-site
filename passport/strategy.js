"use strict";
import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import passportJWT from "passport-jwt";
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
import dotenv from "dotenv";

dotenv.config();

// local strategy for username password login
passport.use(
  new Strategy(async (username, password, done) => {
    console.log(username, password);
    try {
      const user = await userModel.findOne({ username });
      console.log("Local strategy", user);
      if (user === null) {
        return done(null, false, { message: "Incorrect username." });
      }
      const validate = await bcrypt.compare(password, user.password);
      if (!validate) {
        return done(null, false, { message: "Incorrect password." });
      }

      const sUser = user.toObject();
      delete sUser.password;
      console.log("deleted pwd", sUser);

      return done(null, sUser, { message: "Logged in" });
    } catch (err) {
      return done({ message: err });
    }
  })
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.TOKEN_PW,
    },
    async (jwtPayload, done) => {
      console.log("payload", jwtPayload);
      try {
        //find user in db
        const user = await userModel.findById(jwtPayload._id, "-password -__v");
        console.log("pl user", user);

        // hardcoded user
        /*
        let user = null;
        if (jwtPayload.username === "foo") user = { id: 1, username: "foo" };
*/
        if (user !== null) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (e) {
        return done(null, false);
      }
    }
  )
);

export default passport;
