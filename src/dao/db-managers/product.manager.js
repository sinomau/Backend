import __dirname from "../../utils.js";
import productModel from "../models/products.model.js";

class productManager {
  constructor() {
    console.log("Working with products using DataBase");
  }

  async addProduct({
    code,
    title,
    description,
    price,
    thumbnail,
    stock,
    category,
  }) {
    try {
      const product = {
        code,
        title,
        description,
        price,
        thumbnail,
        stock,
        category,
      };
      const products = await productModel.find().lean();
      const codeRepeat = products.find((p) => p.code === code);
      if (codeRepeat) {
        throw new Error("Product repeat!!");
      }

      const result = await productModel.create(product);
      return result;
    } catch (err) {
      console.log(err);
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
      const prodFind = await productModel.findById(id).lean();
      return prodFind;
    } catch (err) {
      throw new Error("Product not found");
    }
  }

  async updateProduct(id, product) {
    try {
      const findAndUpdate = await productModel.findByIdAndUpdate(id, product);
      findAndUpdate.save();
      return findAndUpdate;
    } catch (err) {
      console.log(err);
      throw new Error("Product not updated");
    }
  }

  async deleteProduct(id) {
    try {
      const deletedProduct = await productModel.findByIdAndDelete(id);
      if (!deletedProduct) {
        throw new Error("Product not found");
      }
      return deletedProduct;
    } catch (err) {
      throw new Error("Product not deleted");
    }
  }

  async getProductsByCategory(category) {
    try {
      const products = await productModel.find({ category: category }).lean();
      return products;
    } catch (err) {
      console.error(err);
      throw new Error("Error al buscar productos por categoría");
    }
  }

  async orderProductByPrice(num) {
    try {
      const products = await productModel.aggregate([
        { $sort: { price: num } },
      ]);
      return products;
    } catch (err) {
      console.error(err);
      throw new Error("Error al ordenar productos por precio");
    }
  }
}
export default productManager;
