import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  code: {
    type: Number,
    unique: true,
    required: true,
  },

  title: String,
  description: String,
  price: Number,
  thumbnail: String,
  stock: Number,
  status: Boolean,
  category: String,
});

const productModel = mongoose.model("products", productSchema);

export default productModel;
