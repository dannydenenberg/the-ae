import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    hello: String
  }

  type Area {
    hostname: String!
    lat: Float!
    lon: Float!
  }

  type Mutation {
    do: String
  }
`;

export default typeDefs;
