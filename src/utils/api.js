/**
ALL function for /api/* routes.
USES: Database, cookies, login, etc.
*/

import User from "./../models/user.model";
import Area from "./../models/area.model";
import Listing from "./../models/listing.model";
import Category from "./../models/category.model";
import express from "express";
import { VERIFY_TOKEN_EXPRESS, generateToken } from "./jwt";
import { JWT_COOKIE_NAME, verifyToken } from "./jwt";
import { sendVerificationCodeEmail } from "./email";
import { uploadType } from "./../utils/multer";
import { uploadFiles } from "./../utils/google-storage";

let router = express.Router();

router.get("/sasha", (req, res) => {
  // res.cookie("what up", "2344444293847");
  res.send("hey sasha...");
});

router.get("/categories", (req, res) => {
  Category.find({}, (err, docs) => {
    if (err)
      throw new Error(
        "Couldn't find any categorical data. -- NOTE SUPPOSED TO HAPPEN",
      );
    res.json(docs);
  });
});

router.get("/areas", (req, res) => {
  Area.find({}, (err, docs) => {
    if (err)
      throw new Error(
        "Couldn't find any area data. -- NOT SUPPOSED TO HAPPEN.",
      );
    res.json(docs);
  });
});

router.get("/validatetoken", VERIFY_TOKEN_EXPRESS, (req, res) => {
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

// _id and code are gotten from the URL queries of /verify
// this updates the user's `verified` field to true
router.post("/verifyperson", (req, res) => {
  let { _id, code } = req.query;

  // check if they are actually there (not undefined)
  if (!_id || !code) {
    res.json({ error: true, message: "_id or code was not supplied" });
    return;
  }

  User.findById(_id, (err, doc) => {
    if (err) {
      res.json({
        error: true,
        message: `111 Error in finding document--NOT SUPPOSED TO HAPPEN.
        (OR ==> MongoDB _id is not in the correct format.)
        `,
      });
      return;
    }

    // is the supplied code in the list of usable codes
    if (doc.verificationCodes.includes(code)) {
      // set verified to true
      User.findOneAndUpdate({ _id }, { verified: true }, (err, doc, res2) => {
        if (err) {
          res.json({
            error: true,
            message: "222 Error in finding document -- NOT SUPPOSED TO HAPPEN.",
          });
          console.log(err);
          return;
        }
        res.json({ error: false, message: "Verified." });
      });
    } else {
      res.json({ error: true, message: "Code not found." });
    }
  });
});

/**
BODY:

{
  user: {
    email,
    password
  }
}
 */
router.post("/makeperson", (req, res) => {
  let { user } = req.body;
  let newPerson = new User(user);

  // send a verification email to the person
  let code = newPerson.verificationCodes[0];
  sendVerificationCodeEmail(newPerson._id, code);

  newPerson.save((err) => {
    if (err) {
      res.json({
        error: true,
        message: "333 Error in saving user in database.",
      });
      console.log(err);
    } else {
      res.json({ error: false, ...newPerson });
    }
  });
});

// req.files = ['file1','file2'...]
/* 
req.body = {
  title: 'SHOES??',
  description: 'what is up',
  category: [ 'uno', 'bik' ],
  language: 'en'
}
*/
router.post(
  "/make",
  VERIFY_TOKEN_EXPRESS,
  uploadType("images"),
  async (req, res) => {
    let files = req.files.map((file) => file.filename);

    // upload files to google cloud API
    await uploadFiles(files);

    res.send("recieved.");

    // get user data (_id)
    let token = req.cookies[JWT_COOKIE_NAME];
    // console.log(token)
    let loggedInUserID = (await verifyToken(token))._id;
    console.log(`🎃🎃 ${loggedInUserID}`);

    let listingData = {
      user: loggedInUserID,
      ...req.body,
      images: files,
    };

    console.log(listingData);

    let newListing = new Listing(listingData);
    newListing.save((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("✅ New Listing saved successfully.");
      }
    });
  },
);

// get a single listing from body
// req.body = { listingID: "<MONGO ID>"}
router.post("/listing", (req, res) => {
  Listing.findById(req.body.listingID, (err, doc) => {
    if (err) {
      console.log(err);
      res.json({ error: true, message: "error in finding the document." });
      return;
    }

    if (!doc) {
      res.json({ error: true, message: "Document not found." });
      return;
    }
    res.json(doc);
  });
});

export default router;
