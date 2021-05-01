import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    login(username: String!, password: String!): User
    user(id: ID!): User
  }

  type User {
    id: ID
    username: String
    email: String
    description: String
    token: String
  }

  extend type Mutation {
    addUser(username: String!, email: String!, description: String!): User

    modifyUser(
      id: ID!
      username: String
      email: String
      description: String
    ): User

    deleteUser(id: ID!): User
  }
`;
