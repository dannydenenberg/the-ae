import fetch from "node-fetch";

const developmentURL = "http://127.0.0.1:3000";
const productionURL = "https://the-ae.herokuapp.com";

const baseURL =
  process.env.NODE_ENV == "development" ? developmentURL : productionURL;

class GraphqlClient {
  // server defaults to the current server
  constructor(server = "", graphqlRoute = "/graphql") {
    this.server = server;
    this.graphqlRoute = graphqlRoute;
  }

  // query: string, variables: {var1: 'a', var2: 'b'...}
  query(query, variables = {}) {
    return new Promise((resolve, reject) => {
      // uses node-fetch
      fetch(`${this.server}${this.graphqlRoute}`, {
        method: "POST",
        // credentials: "same-origin", // for sending cookies
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          // if there are errors DON"T resolve
          if (data.errors) {
            reject(data);
          }
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }

  mutate(mutation, variables) {
    return this.query(mutation, variables);
  }
}

export const client = new GraphqlClient(baseURL);

export const HELLO = `
  {
    hello
  }
`;

export const DO = `
  mutation {
    do
  }
`;

export const VALIDATE_TOKEN = `
  query ValidateUserToken {
    validateToken(a: "String") {
      iat
      _id
    }
  }
`;
