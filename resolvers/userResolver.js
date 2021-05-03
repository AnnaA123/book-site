import { AuthenticationError } from "apollo-server-express";
import { login } from "../passport/auth.js";
import User from "../models/userModel.js";
import Review from "../models/reviewModel.js";
import bcrypt from "bcrypt";
const saltrounds = 12;

export default {
  Review: {
    UserID: (parent, args) => {
      return User.findById(parent.UserID);
    },
  },
  Query: {
    login: async (parent, args, { req, res }) => {
      req.body = args;
      try {
        const loginRes = await login(req, res);
        return {
          id: loginRes.user._id,
          username: loginRes.user.username,
          token: loginRes.token,
        };
      } catch (e) {
        throw new AuthenticationError(e.message);
      }
    },
    user: (parent, args) => {
      return User.findById(args.id);
    },
  },

  Mutation: {
    signup: async (parent, args) => {
      const pw = await bcrypt.hash(args.password, saltrounds);
      let usr = {
        username: args.username,
        password: pw,
        email: args.email,
        description: args.description,
      };
      const newUser = new User(usr);
      const sUser = await newUser.save();
      delete sUser.password;
      return sUser;
    },

    modifyUser: async (parent, args, { user }) => {
      if (!user) {
        throw new AuthenticationError("No authorization.");
      }
      let editedUser = {
        username: args.username,
        email: args.email,
        description: args.description,
      };
      return await User.findByIdAndUpdate(args.id, editedUser, {
        new: true,
      });
    },

    deleteUser: async (parent, args, { user }) => {
      console.log("user ", user);
      if (!user) {
        throw new AuthenticationError(
          "You are not authorized to delete this user."
        );
      }
      const result = await User.findByIdAndDelete(args.id);
      return result;
    },
  },
};
