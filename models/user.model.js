import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name.']
  },
  status: {
    type: String,
    required: [true, 'Enter a status.']
  }
})

/** Make sure to use `||` to check whether to
 * return a newly made model OR
 * a previous model.
 */
export default mongoose.models.User || mongoose.model('User', UserSchema)
