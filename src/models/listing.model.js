import * as mongoose from "mongoose";

/** For the Mongoose image getter. NO ending `/` */
const imageStorageBaseURL =
  "https://storage.googleapis.com/the-academia-exchange-images";

export const ListingSchema = new mongoose.Schema(
  {
    // object id of user
    user: {
      required: [true, "A user MUST be associated with a listing."],
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // the area associated with the listing
    area: {
      required: [true, "A listing must have an associated area."],
      type: mongoose.Schema.Types.ObjectId,
      ref: "Area",
    },
    // short, UNIQUE 3 letter abbreviation of the category
    category: {
      required: [true, "A listing must have an associated category."],
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    // manually set this field with Date.now()
    createdAt: {
      type: Date,
      required: [true, "We need to know when the account was created"],
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      required: [true, "An update Date is required"],
      default: Date.now,
    },
    // title of post
    title: {
      type: String,
      required: [true, "Postings need a title"],
    },
    // description of post
    description: {
      type: String,
      required: [true, "Posts need a description"],
    },
    // ISO 639-1 language ID
    language: {
      type: String,
    },
    // whether the person is selling or wanting (at mvp, shouldn't change much)
    isSeller: {
      type: Boolean,
      default: true,
    },
    // list of JUST image names. the server/baseURL listed above will be prepended
    images: {
      type: [String],
      required: false,
      get: (images) => images.map((image) => `${imageStorageBaseURL}/${image}`),
    },
    // any attributes in JSON format associated with posting
    attributes: {
      type: Object,
    },
  },
  { toJSON: { getters: true } },
);

// create text indexes
ListingSchema.index({ title: "text", description: "text" });

const Listing = mongoose.model("Listing", ListingSchema);
export default Listing;
