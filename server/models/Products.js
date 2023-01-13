import { Schema, model } from "mongoose";

const productsSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
  },
  image: {
    type: String,
  },
});
export default model("Products", productsSchema);
