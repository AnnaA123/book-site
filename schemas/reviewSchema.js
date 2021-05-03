import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    reviews: [Review]
    review(id: ID): Review
    reviewsByBook(BookID: String): [Review]
    reviewsByUser(UserID: String): [Review]
  }

  type Review {
    id: ID
    BookID: String
    BookTitle: String
    Title: String
    Content: String
    UserID: User
  }

  extend type Mutation {
    addReview(
      BookID: String!
      BookTitle: String!
      Title: String!
      Content: String!
      UserID: ID!
    ): Review

    modifyReview(
      id: ID!
      BookID: String
      BookTitle: String
      Title: String
      Content: String
      UserID: ID
    ): Review

    deleteReview(id: ID!): Review
  }
`;
