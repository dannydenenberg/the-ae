import { gql } from "apollo-server-express";

// NOTE: All queries or mutations need a parameter.

const typeDefs = gql`
  type Query {
    hello: String
    validateToken(a: String): Boolean
    gatherCategories(a: String): [Category]!
  }

  input UserInput {
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

  type SubCategory {
    abbreviation: String!
    description: String!
  }
  type Category {
    abbreviation: String!
    description: String!
    subCategories: [SubCategory]
  }

  type Area {
    hostname: String!
    lat: Float!
    lon: Float!
  }

  type Mutation {
    do: String
    verifyUser(_id: ID!, code: String!): Boolean
    makeUser(user: UserInput): User
    logOn(user: UserInput): String
  }
`;

export default typeDefs;
