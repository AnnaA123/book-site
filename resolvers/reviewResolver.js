import Review from "../models/reviewModel.js";
import { AuthenticationError } from "apollo-server-express";

export default {
  Query: {
    reviews: (parent, args, context, info) => {
      return Review.find();
    },
    review: (parent, args) => {
      return Review.findById(args.id);
    },
    reviewsByBook: async (parent, args) => {
      return Review.find({ BookID: args.BookID });
    },
    reviewsByUser: async (parent, args) => {
      return Review.find({ UserID: args.UserID });
    },
  },

  Mutation: {
    addReview: async (parent, args, { user }) => {
      if (!user) {
        throw new AuthenticationError("You need to be logged in.");
      }

      let newReview = new Review({
        BookID: args.BookID,
        BookTitle: args.BookTitle,
        UserID: user._id,
        Title: args.Title,
        Content: args.Content,
        Rating: args.Rating,
      });
      return newReview.save();
    },

    modifyReview: async (parent, args, { user }) => {
      if (!user) {
        throw new AuthenticationError(
          "You are not authorized to edit this review."
        );
      }
      let editedReview = {
        Title: args.Title,
        Content: args.Content,
        Rating: args.Rating,
      };
      return await Review.findByIdAndUpdate(args.id, editedReview, {
        new: true,
      });
    },

    deleteReview: async (parent, args, { user }) => {
      if (!user) {
        throw new AuthenticationError(
          "You are not authorized to delete this review."
        );
      }
      const result = await Review.findByIdAndDelete(args.id);
      return result;
    },
  },
};
