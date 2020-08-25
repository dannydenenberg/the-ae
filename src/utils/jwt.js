import jwt from "jsonwebtoken";
import dotenv from "dotenv";
export { JWT_COOKIE_NAME } from "./constants";

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
