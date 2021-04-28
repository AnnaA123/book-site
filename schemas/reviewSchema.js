import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    reviews: Review
    review(id: ID): Review
  }

  type Review {
    id: ID
    Title: String
    Content: String
  }
`;