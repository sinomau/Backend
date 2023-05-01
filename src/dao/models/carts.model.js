import mongoose from "mongoose";

export const CartCollection = "carts";

const cartsSchema = new mongoose.Schema({
  products: {
    type: [
      {
        quantity: { type: Number, default: 1 },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
      },
    ],
    default: [],
  },
});

const cartsModel = mongoose.model("carts", cartsSchema);

export default cartsModel;
