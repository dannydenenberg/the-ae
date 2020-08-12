import sirv from "sirv";
import express from "express";
import compression from "compression";
import * as sapper from "@sapper/server";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/type-defs";
import resolvers from "./graphql/resolvers";
import debugMiddleware from "./utils/debug";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import startDB from "./utils/start-database";
import Kitty from "./models/kitty.model";

let m = new Kitty({
  age: 12,
});

m.save((err) => {
  // here's how to access the required message from a mongoose error
  if (err) console.log(err.errors.name.properties.message);
});

/** Load config vars for development purposes. **/
dotenv.config();

/** Start the Database **/
startDB();

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

const app = express();
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);

/** Set up GraphQL **/
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // access req,res in the 'context' param
  // in resolvers like so: context.req or context.res
  context: ({ req, res }) => {
    return { req, res };
  },
});

/** MUST be placed right under the 'server' variable */
server.applyMiddleware({
  app,
  cors: false, // allows express' cors above to work
});

app.use(
  compression({
    threshold: 0,
  }),
  sirv("static", {
    dev,
  }),
  sapper.middleware()
);

app.use(debugMiddleware);

app.listen(PORT, (err) => {
  if (err) console.log("error", err);
});
