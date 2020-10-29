import sirv from "sirv";
import express from "express";
import compression from "compression";
import * as sapper from "@sapper/server";
import debugMiddleware from "./utils/debug";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
// import "dotenv/config";
import startDB from "./utils/start-database";
import Kitty from "./models/kitty.model";
import { uploadType } from "./utils/multer";
import { uploadFiles } from "./utils/google-storage";
import fs from "fs";
import root from "app-root-path";
import rateLimit from "express-rate-limit";
import Area from "./models/area.model";
import { JWT_COOKIE_NAME, verifyToken } from "./utils/jwt";
import User from "./models/user.model";
import apiRoutes from "./utils/api";

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
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https") {
      res.redirect(`https://${req.header("host")}${req.url}`);
    } else {
      next();
    }
  });
}

/** Rate Limiting **/
// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set("trust proxy", 1);
const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 400, // limit each IP to 400 requests per windowMs
});

//  apply to all requests
app.use(limiter);

app.use(express.json());

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);

// API routes
app.use("/api", apiRoutes);

app.get("/poopoo", (req, res) => {
  res.send("yes poopoo is smelly (sol doesn't) wipe");
});

app.post("/files", uploadType, async (req, res) => {
  let files = req.files.map((file) => file.filename);
  console.log(files);

  await uploadFiles(files);

  res.send("all done baby");
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
