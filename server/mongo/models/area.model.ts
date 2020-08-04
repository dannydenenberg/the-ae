import * as mongoose from 'mongoose';

export interface IArea extends mongoose.Document {
  hostname: string, // our unique hostname for the Area (e.g. /~uno, /~dartmouth, /~stanford/)
  lat: number, // latitude
  lon: number, // longitude
  country: string, // Area's ISO 3166-1 alpha-2 two-letter country code
  region: string // state, province, etc
  description: string, // Short name/description of the area
  timezone: string, // time zone formatted to the IANA Time Zone Database (aka tz database)
  createdAt: number // Date/time that the area was added
}

export const AreaSchema = new mongoose.Schema({
  hostname: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lon: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  timezone: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Area = mongoose.model<IArea>('Area', AreaSchema);
export default Area;
