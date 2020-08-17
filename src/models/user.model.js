import mongoose from "mongoose";
import bcrypt from "bcrypt";

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email MUST be unique"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  verificationCodes: {
    type: [String],
    required: [true, "Codes must be here even if empty"],
    // random new code = random number "GQL" current time
    default: [
      `${Math.floor(
        Math.random() * 239487139 + 1001,
      )}GQL${new Date().getTime()}`,
    ],
  },
  verified: {
    type: Boolean,
    required: [true, "Must know if user is verified"],
    default: false,
  },
  // TODO:
  posts: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    default: [],
  },
  // ISO 639-1 language ID
  preferedLanguage: {
    type: String,
    required: false,
  },
  // objectid of the area using references
  preferedArea: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Area",
    required: false,
  },
  // manually set this field with Date.now()
  createdAt: {
    type: Date,
    required: [true, "We need to know when the account was created"],
    default: Date.now,
  },
});

/************************************************************
 ******** Password Hashing features. ***********
 *************************************************************/
/** NOTE: you CANNOT use arrow functions in mongoose methods. */

// Before user is saved, hash password
UserSchema.pre("save", function (next) {
  const SALT_WORK_FACTOR = 10;
  let user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

// if isMatch == true, it worked. Otherwise, no
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model("User", UserSchema);
export default User;
