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
    enum: ["admin", "user", "premium"],
    default: "user",
  },
  last_connection: {
    type: Date,
    default: null,
  },
  status: {
    type: String,
    required: true,
    enums: ["Completo", "Pendiente", "Incompleto"],
    default: "Pendiente",
  },
  documents: {
    type: [
      {
        name: { type: String, required: true },
        reference: { type: String, required: true },
      },
    ],
    default: [],
  },

  avatar: { type: String, default: "" },
});

export const userModel = mongoose.model(userCollection, userSchema);
