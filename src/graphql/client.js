import ApolloClient, { gql } from "apollo-boost";
import fetch from "node-fetch";

const developmentURL = "http://localhost:3000";
const productionURL = "https://the-ae.vercel.app/";

const baseURL =
  process.env.NODE_ENV == "development" ? developmentURL : productionURL;

export const client = new ApolloClient({
  uri: `${baseURL}/graphql`,
  fetch, // specify how to fetch in a node env.
  credentials: "include",
  // credentials: "same-origin",
});

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
