import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model("products", productSchema);

export default productModel;
