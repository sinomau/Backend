import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    default: [],
  },
});

cartsSchema.pre("findOne", function () {
  this.populate("products.product");
});

const cartsModel = mongoose.model("carts", cartsSchema);

export default cartsModel;
