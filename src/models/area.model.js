import mongoose from "mongoose";

export const AreaSchema = new mongoose.Schema({
  // our unique hostname for the Area (e.g. /~uno, /~dartmouth, /~stanford/)
  hostname: {
    type: String,
    required: [true, "Hostname is required"],
  },
  // latitude
  lat: {
    type: Number,
    required: [true, "Supply a latitude"],
  },
  // longitude
  lon: {
    type: Number,
    required: [true, "Supply a longitude"],
  },
  // Area's ISO 3166-1 alpha-2 two-letter country code
  country: {
    type: String,
    required: [true, "Country is required"],
  },
  // state, province, etc
  region: {
    type: String,
    required: [true, "Region is a required field"],
  },
  // Short name/TITLE of the area
  description: {
    type: String,
    required: [true, "A description is required"],
  },
  // time zone formatted to the IANA Time Zone Database (aka tz database)
  timezone: {
    type: String,
    required: [true, "Enter a timezone"],
  },
  // Date/time that the area was added
  createdAt: {
    type: Date,
    required: [true, "Must supply a time at which it was created"],
    default: Date.now,
  },
});

const Area = mongoose.model("Area", AreaSchema);

export default Area;
