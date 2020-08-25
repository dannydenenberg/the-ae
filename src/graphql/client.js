import ApolloClient, { gql } from "apollo-boost";
import fetch from "node-fetch";
import { onError } from "@apollo/client/link/error";

const developmentURL = "http://localhost:3000";
const productionURL = "https://the-ae.herokuapp.com";

const baseURL =
  process.env.NODE_ENV == "development" ? developmentURL : productionURL;

export const client = new ApolloClient({
  uri: `${baseURL}/graphql`,
  fetch, // specify how to fetch in a node env.
  credentials: "include",
  // credentials: "same-origin",
});

export const LOG_OUT = gql`
  mutation {
    logOut
  }
`;

export const VERIFY_USER = gql`
  mutation VerifyUser($_id: ID!, $code: String!) {
    verifyUser(_id: $_id, code: $code)
  }
`;

export const MAKE_USER = gql`
  mutation CreateMessage($user: UserInput) {
    makeUser(user: $user) {
      _id
    }
  }
`;

export const LOG_ON_USER = gql`
  mutation LogOnUser($user: UserInput) {
    logOn(user: $user)
  }
`;

export const HELLO = gql`
  {
    hello
  }
`;

export const DO = gql`
  mutation {
    do
  }
`;

export const VALIDATE_TOKEN = gql`
  query ValidateUserToken($token: String) {
    validateToken(token: $token) {
      _id
      iat
    }
  }
`;
