import mongoose from "mongoose";

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

const User = mongoose.model("User", UserSchema);
export default User;
