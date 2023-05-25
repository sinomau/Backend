import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
  code: {
    type: Number,
    unique: true,
    required: false,
  },

  title: String,
  description: String,
  price: Number,
  thumbnail: String,
  stock: Number,
  category: String,
});

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model("products", productSchema);

export default productModel;
