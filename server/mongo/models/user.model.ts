import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  email: string,
  password: string,
  preferedLanguage?: string, // ISO 639-1 language ID
  preferedArea?: string, // objectid of the area using references
  createdAt: number, // manually set this field with Date.now()
}

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  preferedLanguage: {
    type: String,
    required: false,
  },
  preferedArea: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Area',
    required: false,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
