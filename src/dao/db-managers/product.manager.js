import __dirname from "../../utils/utils.js";
import productModel from "../models/products.model.js";
import { faker } from "@faker-js/faker";
import { logger } from "../../utils/logger.js";
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
    owner,
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
        owner,
      };
      const products = await productModel.find().lean();
      const codeRepeat = products.find((p) => p.code === code);
      if (codeRepeat) {
        throw new Error("Product repeat!!");
      }

      const result = await productModel.create(product);
      return result;
    } catch (err) {
      logger.error(err);
      throw new Error("Product not added");
    }
  }

  async getProducts() {
    try {
      const products = await productModel.find().lean();
      return products;
    } catch (e) {
      logger.error(err);
      return [];
    }
  }

  async getProductById(id) {
    try {
      const prodFind = await productModel.findById(id).lean();
      return prodFind;
    } catch (err) {
      logger.error(err);
      throw new Error("Product not found");
    }
  }

  async updateProduct(id, product) {
    try {
      const findAndUpdate = await productModel.findByIdAndUpdate(id, product);
      findAndUpdate.save();
      return findAndUpdate;
    } catch (err) {
      logger.error(err);
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
      logger.error(err);
      throw new Error("Product not deleted");
    }
  }

  async getProductsByCategory(category) {
    try {
      const products = await productModel.find({ category: category }).lean();
      return products;
    } catch (err) {
      logger.error(err);
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
      logger.error(err);
      throw new Error("Error al ordenar productos por precio");
    }
  }

  async mockingProducts() {
    try {
      const products = [];
      for (let i = 0; i < 100; i++) {
        const product = {
          code: parseInt(faker.string.numeric(4)),
          title: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: faker.commerce.price(),
          thumbnail: faker.image.url(),
          stock: parseInt(faker.string.numeric(2)),
          category: faker.commerce.department(),
        };
        products.push(product);
      }
      return products;
    } catch (err) {
      logger.error(err);
      throw new Error("Error al mockear productos");
    }
  }
}
export default productManager;
