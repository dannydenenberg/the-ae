import mongoose from "mongoose";

/**
This file stores the 2-level category heierarchy, like so:
for sale
-- bikes
-- bike parts
-- supplies

housing
-- apt/housing for rent
-- condos
...
 */
export const SubCategorySchema = new mongoose.Schema({
  // short, 3 letter abbreviation
  abbreviation: {
    type: String,
    required: [true, "A sub category needs an abbreviation"],
    unique: [true, "The abbreviation MUST be unique for referencing purposes"],
  },
  // short description
  description: {
    type: String,
    required: [true, "A sub category needs a description"],
  },
});

export const CategorySchema = new mongoose.Schema({
  // short, UNIQUE 3 letter abbreviation
  abbreviation: {
    type: String,
    required: [true, "A category needs an abbreviation"],
    unique: [true, "The abbreviation MUST be unique for referencing purposes"],
  },
  // short description
  description: {
    type: String,
    required: [true, "A category needs a description"],
  },
  subCategories: {
    type: [SubCategorySchema],
  },
});

const Category = mongoose.model("Category", CategorySchema);
export default Category;
