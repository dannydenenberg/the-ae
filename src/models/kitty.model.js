import mongoose from "mongoose";

const KittySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The kitty needs a name"],
  },
  age: {
    type: Number,
    required: [true, "The kitty needs an age"],
  },
});

// export default mongoose.models.Kitty || mongoose.model("Kitty", KittySchema);
export default mongoose.model("Kitty", KittySchema);
