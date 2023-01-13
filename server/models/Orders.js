import { Schema, model } from "mongoose";

const ordersSchema = new Schema({
  client: {
    type: Schema.ObjectId,
    ref: "Clients",
  },
  order: [
    {
      product: {
        type: Schema.ObjectId,
        ref: "Products",
      },
      quantity: Number,
    },
  ],
  total: {
    type: Number,
  },
});

export default model("Orders", ordersSchema);
