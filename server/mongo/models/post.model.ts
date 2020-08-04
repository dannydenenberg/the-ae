import * as mongoose from 'mongoose';

// for mongoose getter. NO ending `/`
const imageStorageBaseURL = 'https://storage.googleapis.com/the-academia-exchange-images';

export interface IPost extends mongoose.Document {
  user: string, // object id of user
  category: string, // id of category
  createdAt: number, // date of creation
  updatedAt: number, // when the post was last updated
  title: string, // title of post
  description: string, // description of post
  language?: string, // ISO 639-1 language ID
  isSeller: boolean, // whether the person is selling or wanting (at mvp, shouldn't change much)
  images: string[], // list of JUST image names. the server/baseURL listed above will be prepended
  attributes?: any // any attributes in JSON format associated with posting
}

export const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  // TODO: finish this
  category
  images: {
    type: [String],
    required: false,
    get: (image) => `${imageStorageBaseURL}/${image}`,
  },
});

const Post = mongoose.model<IPost>('Post', PostSchema);
export default Post;
