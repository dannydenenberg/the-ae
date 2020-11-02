import mongoose from "mongoose";

// A topic is a collection of categories.

export const TopicSchema = new mongoose.Schema({
  // short, UNIQUE 3 letter abbreviation
  abbreviation: {
    type: String,
    required: [true, "A topic needs an abbreviation"],
    unique: [true, "The abbreviation MUST be unique for referencing purposes"],
  },
  // short description/TITLE
  description: {
    type: String,
    required: [true, "A topic needs a description"],
  },

  categories: {
    type: [String],
    required: [true, "A topic MUST have one or more categories."],
  },
});

const Topic = mongoose.model("Topic", TopicSchema);
export default Topic;
