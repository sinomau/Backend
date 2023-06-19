import mongoose from "mongoose";
import productModel from "../dao/models/products.model.js";
import { dbConnection } from "../config/dbConnection.js";

dbConnection();

const updateProducts = async () => {
  try {
    const products = await productModel.find();
    console.log(products)
    const adminId = "646fb898fb640ad174520165";
    const result = await productModel.updateMany(
      {},
      { $set: { owner: adminId } }
    );
    console.log("result", result);
  } catch (error) {
    console.log("error");
  }
};

updateProducts();
