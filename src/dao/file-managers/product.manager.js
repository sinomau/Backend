import fs from "fs";
import __dirname from "../../utils/utils.js";

class productManager {
  #path = __dirname + "/dao/file-managers/files/products.json";

  constructor(path) {
    this.path = path;
    console.log("Working with products file system");
  }

  generateId(array) {
    let lastId = 0;

    array.forEach((p) => {
      if (p.id > lastId) {
        lastId = p.id;
      }
    });

    return lastId + 1;
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
      const newProduct = {
        id: this.generateId(await this.getProducts()),
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnail,
      };

      const products = await this.getProducts();

      const codeRepeat = products.find((p) => p.code === code);
      if (codeRepeat) {
        throw new Error("Product repeat!!");
      }

      const updateProducts = [...products, newProduct];

      await fs.promises.writeFile(this.#path, JSON.stringify(updateProducts));
      return updateProducts;
    } catch (err) {
      throw new Error("Product not added");
    }
  }

  async getProducts() {
    try {
      const stock = await fs.promises.readFile(this.#path, "utf-8");
      return JSON.parse(stock);
    } catch (err) {
      logger.error(err);
      return [];
    }
  }

  async getProductById(productId) {
    const getStock = await this.getProducts();
    const parsedProdId = parseInt(productId);
    const find = getStock.find((product) => product.id === parsedProdId);
    if (find) {
      return find;
    } else {
      throw new Error("Product not found");
    }
  }
  async deleteProduct(productId) {
    const products = await this.getProducts();
    const parsedId = parseInt(productId);
    const id = products.find((product) => product.id === parsedId);

    if (!id) {
      throw new Error("Product not found");
    } else {
      products.findIndex((product) => product.id === parsedId);
      const newProducts = products.filter((product) => product.id !== parsedId);
      await fs.promises.writeFile(this.#path, JSON.stringify(newProducts));
    }
  }

  async updateProduct(productId, dataToUpdate) {
    const products = await this.getProducts();
    const parsedId = parseInt(productId);
    const findProduct = products.find((product) => product.id === parsedId);

    if (!findProduct) {
      throw new Error("Product not found");
    }

    if (Object.keys(dataToUpdate).includes("id")) {
      throw new Error("Cannot update id");
    }

    if (Object.keys(dataToUpdate).includes("code")) {
      const codeRepeat = products.find((p) => p.code === dataToUpdate.code);
      if (codeRepeat) {
        throw new Error("Product repeat!!");
      }
    }

    dataToUpdate = { ...findProduct, ...dataToUpdate };

    let newProducts = products.filter((p) => p.id !== productId);
    newProducts = [...newProducts, dataToUpdate];

    await fs.promises.writeFile(this.#path, JSON.stringify(newProducts));
  }
}

export default productManager;
