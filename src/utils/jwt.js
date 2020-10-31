import jwt from "jsonwebtoken";
import dotenv from "dotenv";
export { JWT_COOKIE_NAME } from "./constants";
import { JWT_COOKIE_NAME } from "./constants";

dotenv.config();

const JWT_COOKIE_OPTIONS = {
  httpOnly: true,
};
const { JWT_TOKEN_SECRET } = process.env;
const expiresIn = "604800s"; // = 7 days

/** The 'data' passed looks like this:
 * {_id: "adktbfha893y"} **/
export const generateToken = (data) => {
  return jwt.sign(data, JWT_TOKEN_SECRET, { expiresIn });
};

/** Verifying a token uses promises. **/
export const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_TOKEN_SECRET, (err, data) => {
      if (err) return reject(err); // token is invalid
      resolve(data); // token in valid
    });
  });
};

// This puts the token information inside req.loggedInPersonTokenInformation IF it is a valid token.
export const VERIFY_TOKEN_EXPRESS = (req, res, next) => {
  let token = req.cookies[JWT_COOKIE_NAME];
  verifyToken(token)
    .then((data) => {
      req.loggedInPersonTokenInformation = data;
      next();
    })
    .catch((err) => {
      console.log("Token validation FAILED.");
      next();
    });
};
