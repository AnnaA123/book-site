import Review from "../models/reviewModel.js";

export default {
  Query: {
    stations: (parent, args, context, info) => {
      return Review.find();
    },
    station: (parent, args) => {
      return Review.findById(args.id);
    },
  },
};
