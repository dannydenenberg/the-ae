import mongoose from "mongoose";

/**
This file stores the FLAT-level category heierarchy, like so:
-- bikes
-- bike parts
-- supplies
-- apt/housing for rent
-- condos

these can be grouped into separate categories from another level
...
 */

export const CategorySchema = new mongoose.Schema({
  // short, UNIQUE 3 letter abbreviation
  abbreviation: {
    type: String,
    required: [true, "A category needs an abbreviation"],
    unique: [true, "The abbreviation MUST be unique for referencing purposes"],
  },
  // short description/TITLE
  description: {
    type: String,
    required: [true, "A category needs a description"],
  },
});

const Category = mongoose.model("Category", CategorySchema);
export default Category;
