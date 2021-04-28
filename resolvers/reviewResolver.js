import Review from "../models/reviewModel.js";

export default {
  Query: {
    reviews: (parent, args, context, info) => {
      return Review.find();
    },
    review: (parent, args) => {
      return Review.findById(args.id);
    },
  },

  Mutation: {
    addReview: async (parent, args) => {
      let newReview = new Review({
        BookID: args.BookID,
        BookTitle: args.BookTitle,
        UserID: args.UserID,
        Title: args.Title,
        Content: args.Content,
      });
      return newReview.save();
    },

    modifyReview: async (parent, args) => {
      let editedReview = {
        Title: args.Title,
        Content: args.Content,
      };
      return await Review.findByIdAndUpdate(args.id, editedReview, {
        new: true,
      });
    },

    deleteReview: async (parent, args) => {
      const result = await Review.findByIdAndDelete(args.id);
      return result;
    },
  },
};
