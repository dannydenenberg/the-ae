import User from "./../models/user.model";
import { sendVerificationCodeEmail } from "./../utils/email";
import { JWT_COOKIE_NAME, verifyToken, generateToken } from "./../utils/jwt";
import Category from "./../models/category.model";

/** Here are the parameters all resolvers can take:
 * (parent, args, context, info)
 */
const resolvers = {
  Query: {
    /** Return ALL category data. */
    // move to api done
    gatherCategories: (parent, { a }, { req, res }, info) => {
      return new Promise((resolve, reject) => {
        Category.find({}, (err, docs) => {
          if (err) reject(err);
          resolve(docs);
        });
      });
    },

    // Either req.cookies or args.token holds the contents of the jwt token
    // ^^ depending on whether the request was sent from the server or client.
    validateToken: (parent, { token }, { req, res }, info) => {
      console.log("REQ:", req.cookies[JWT_COOKIE_NAME]);
      console.log("TOKEN:", token);

      const accessToken = req.cookies[JWT_COOKIE_NAME] || token;

      return new Promise((resolve, reject) => {
        console.log("🎨verifying...");
        verifyToken(accessToken)
          .then((data) => resolve(data))
          .catch((error) => reject(error));
      });
    },
    hello: (parent, args, { req, res }, info) => {
      // console.log("HERE ARE 🍪:", JSON.stringify(req.cookies));
      // res.cookie(`444 SHOULDN't bee HER`, "den2", {
      //   httpOnly: true,
      // });
      // // res.redirect("/files");
      // return `hey george washington, it's ${new Date()}`;
      return new Promise((resolve, reject) => {
        resolve("hey man2222");
      });
    },
  },
  Mutation: {
    // clear cookie from user computer
    logOut: (parent, { a }, { req, res }, info) => {
      res.clearCookie(JWT_COOKIE_NAME);
      return true;
    },
    // validates email/password. sets httponly cookie
    logOn: (parent, { user }, { req, res }, info) => {
      return new Promise((resolve, reject) => {
        User.findOne({ email: user.email }, (err, doc) => {
          if (err) {
            reject(err);
          }

          if (!doc) {
            reject("no user matched");
          } else {
            // there was a user
            doc.comparePassword(user.password, (err, isMatch) => {
              if (err) {
                reject("there was an error in matching passwords");
              }

              if (isMatch === true) {
                // correct password
                let token = generateToken({ _id: doc._id });

                // set HTTP only cookie
                res.cookie(JWT_COOKIE_NAME, token, {
                  secure: true,
                  httpOnly: true,
                });
                resolve(token);
              } else {
                reject("password isn't correct");
              }
            });
          }
        });
        // resolve("yello2");
      });
    },
    // _id and code are gotten from the URL queries of /verify
    // this updates the user's `verified` field to true
    verifyUser: (parent, { _id, code }, { req }, info) => {
      // TODO:
      return new Promise((resolve, reject) => {
        User.findById(_id, (err, doc) => {
          if (err) {
            resolve(false);
            console.log(err);
            return;
          }
          console.log(doc);

          // is the supplied code in the list of usable codes
          if (doc.verificationCodes.includes(code)) {
            // set verified to true
            User.findOneAndUpdate(
              { _id },
              { verified: true },
              (err, doc, res) => {
                if (err) {
                  resolve(false);
                  console.log(err);
                  return;
                }
                resolve(true);
              }
            );
          } else {
            resolve(false);
          }
        });
      });
    },
    makeUser: async (parent, args, { req, res }, info) => {
      return new Promise((resolve, reject) => {
        let newUser = new User(args.user);

        let code = newUser.verificationCodes[0];
        sendVerificationCodeEmail(newUser._id, code);

        newUser.save((err) => {
          if (err) {
            reject(err);
          } else {
            resolve(newUser);
          }
        });
      });
    },
    do: (parent, args, context, info) => {
      return "did it bud";
    },
  },
};

export default resolvers;
