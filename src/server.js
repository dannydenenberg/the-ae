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
import { uploadType } from "./utils/multer";
import { uploadFiles } from "./utils/google-storage";
import fs from "fs";
import root from "app-root-path";
import Area from "./models/area.model";

/** Create uploads file if not already created */
try {
  fs.mkdirSync(`${root.path}/uploads`);
} catch (err) {
  console.log("uploads file already created");
}

// let uno = {
//   hostname: "uno",
//   lat: 41.2580268,
//   lon: -96.01289,
//   country: "us",
//   region: "nebraska",
//   description: "University of Nebraska at Omaha",
//   timezone: "America/Chicago",
// };
// let m = new Area(uno);

// console.log("id: ", m._id);

// m.save((err) => {
//   // here's how to access the required message from a mongoose error
//   if (err) console.log(err.errors.name.properties.message);
// });

/** Load config vars for development purposes. **/
dotenv.config();

/** Start the Database **/
startDB();

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

const app = express();

/** Redirect from http to https **/
if(process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else
      next()
  })
}

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  }),
);

app.get("/poopoo", (req, res) => {
  res.send("yes poopoo is smelly (sol doesn't) wipe");
});

app.post("/files", uploadType, async (req, res) => {
  let files = req.files.map((file) => file.filename);
  console.log(files);

  await uploadFiles(files);

  res.send("all done baby");
});

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
  sapper.middleware(),
);

app.use(debugMiddleware);

app.listen(PORT, (err) => {
  if (err) console.log("error", err);
});
