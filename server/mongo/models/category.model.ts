import * as mongoose from 'mongoose';

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

export interface ICategory extends mongoose.Document {
  abbreviation: string, // A unique, three-letter/digit defined-by-us Category Abbreviation
  description: string, // super short description of category
  subCategories: {

  }
}

export const CategorySchema = new mongoose.Schema({

});

const Category = mongoose.model<ICategory>('Category', CategorySchema);
export default Category;
