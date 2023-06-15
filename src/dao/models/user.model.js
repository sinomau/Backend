import mongoose from "mongoose";
import cartsModel from "./carts.model.js";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: cartsModel,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user","premium"],
    default: "user",
  },
});

export const userModel = mongoose.model(userCollection, userSchema);
