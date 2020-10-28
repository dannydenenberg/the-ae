/**
ALL function for /api/* routes.
USES: Database, cookies, login, etc.
*/

import User from "./../models/user.model";
import Category from "./../models/category.model";
import express from "express";
import { VERIFY_TOKEN_EXPRESS, generateToken } from "./jwt";
import { JWT_COOKIE_NAME } from "./constants";

let router = express.Router();

router.get("/sasha", (req, res) => {
  // res.cookie("what up", "2344444293847");
  res.send("hey sasha...");
});

router.get("/categories", (req, res) => {
  Category.find({}, (err, docs) => {
    if (err)
      throw new Error(
        "Couldn't find any categorical data. -- NOTE SUPPOSED TO HAPPEN"
      );
    res.json(docs);
  });
});

router.get("/validate", VERIFY_TOKEN_EXPRESS, (req, res) => {
  // if it makes it here, validated.
  res.json({ error: false, message: "Validated!" });
});

router.post("/logout", (req, res) => {
  res.clearCookie(JWT_COOKIE_NAME);
  res.send("you have been <strong>logged out</strong>.");
});

/**
req.body = {
  user: {
    email,
    password
  }
}
 */
router.post("/logon", (req, res) => {
  console.log("😹 in logon");
  let { user } = req.body;

  User.findOne({ email: user.email }, (err, doc) => {
    if (err) {
      res.json({
        error: true,
        message: "Database search error--SHOULD NOT HAPPEN.",
      });
    }

    if (!doc) {
      res.json({ error: true, message: "No user found." });
    } else {
      doc.comparePassword(user.password, (err, isMatch) => {
        if (err) {
          res.json({ error: true, message: "ERror in comparing passwords." });
        }

        if (isMatch === true) {
          console.log("MATCHED!!!");
          // correct password
          let token = generateToken({ _id: doc._id });

          // set HTTP only cookie
          res.cookie(JWT_COOKIE_NAME, token, {
            secure: true,
            httpOnly: true,
          });
          res.json({ error: false });
        } else {
          res.json({ error: true, message: "passwords dont match." });
        }
      });
    }
  });
});

export default router;
