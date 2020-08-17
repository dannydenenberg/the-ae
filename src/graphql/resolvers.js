import User from "./../models/user.model";
import { sendVerificationCodeEmail } from "./../utils/email";

/** Here are the parameters all resolvers can take:
 * (parent, args, context, info)
 */
const resolvers = {
  Query: {
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
              },
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
            reject("couldn't create new user");
          } else {
            resolve(newUser);
          }
        });
      });
    },
    do: (parent, args, context, info) => {
      context.res.cookie("in mutation", `${new Date().getSeconds()}`, {
        httpOnly: true,
      });

      return "did it bud";
    },
  },
};

export default resolvers;
