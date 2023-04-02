import __dirname from "../../utils.js";
import productModel from "../models/products.model.js";

class productManager {
  constructor() {
    console.log("Working with products using DataBase");
  }

  async addProduct({
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail,
  }) {
    try {
      const product = {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnail,
      };
      const products = await productModel.find().lean();
      const codeRepeat = products.find((p) => p.code === code);
      if (codeRepeat) {
        throw new Error("Product repeat!!");
      }

      const result = await productModel.create(product);
      return result;
    } catch (err) {
      throw new Error("Product not added");
    }
  }

  async getProducts() {
    try {
      const products = await productModel.find().lean();
      return products;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async getProductById(id) {
    try {
      console.log(id);
      const prodFind = await productModel.findById(id).lean();
      return prodFind;
    } catch (err) {
      throw new Error("Product not added");
    }
  }

  async updateProduct(id, product) {
    try {
      console.log(id);
      const findAndUpdate = await productModel.findByIdAndUpdate(id, product);
      return findAndUpdate;
    } catch (err) {
      throw new Error("Product not updated");
    }
  }

  async deleteProduct(id) {
    try {
      console.log(id);
      const findAndDelete = await productModel.findByIdAndDelete(id);
      return findAndDelete;
    } catch (err) {
      throw new Error("Product not deleted");
    }
  }
}

export default productManager;
