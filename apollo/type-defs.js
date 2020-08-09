import { gql } from '@apollo/client'

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    status: String!
  }

  type Query {
    people: [User]
  }

  type Mutation {
    make(id: ID, name: String!, status: String!): User
  }
`
