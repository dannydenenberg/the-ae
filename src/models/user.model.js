import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  verified: {
    type: Boolean,
    required: [true, "Must know if user is verified"],
  },
  // TODO:
  posts: {
    type: [{ type: Schema.Types.ObjectId, ref: "Post" }],
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
