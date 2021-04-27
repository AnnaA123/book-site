import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    login(username: String!, password: String!): User
  }

  type User {
    id: ID
    username: String
    email: String
    description: String
    token: String
  }
`;
