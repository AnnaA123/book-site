import reviewSchema from "./reviewSchema.js";
import userSchema from "./userSchema.js";
import { gql } from "apollo-server-express";

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

export default [linkSchema, reviewSchema, userSchema];
