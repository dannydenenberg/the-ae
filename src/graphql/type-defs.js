import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    hello: String
  }

  input UserINPUT {
    email: String!
    password: String!
    preferedLanguage: String
    preferedArea: String
  }

  type User {
    verified: Boolean!
    email: String!
    password: String!
    preferedLanguage: String
    preferedArea: String
    _id: ID!
    verificationCodes: [String]!
  }

  type Area {
    hostname: String!
    lat: Float!
    lon: Float!
  }

  type Mutation {
    do: String
    verifyUser(_id: ID!, code: String!): Boolean
    makeUser(user: UserINPUT): User
  }
`;

export default typeDefs;
