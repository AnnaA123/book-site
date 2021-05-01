import { AuthenticationError } from "apollo-server-express";
import { login } from "../passport/auth.js";
import User from "../models/userModel.js";

export default {
  Query: {
    login: async (parent, args, { req, res }) => {
      req.body = args;
      try {
        const loginRes = await login(req, res);
        return {
          id: loginRes.user.id,
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
    addUser: async (parent, args) => {
      // TODO
    },

    modifyReview: async (parent, args, { user }) => {
      if (!user) {
        throw new AuthenticationError("No authorization.");
      }
      let editedUser = {
        username: args.username,
        email: args.email,
        description: args.description,
      };
      return await User.findByIdAndUpdate(args.id, editedReview, {
        new: true,
      });
    },

    deleteReview: async (parent, args, { user }) => {
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
