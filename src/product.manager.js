import fs from "fs";

class productManager {
  #accumulator = 0;
  #path;

  constructor(path) {
    this.#path = path;
  }

  async addProduct(
    title,
    description,
    code,
    price,
    status = true,
    stock,
    category,
    thumbnail = ""
  ) {
    try {
      const newProduct = {
        id: this.#accumulator++,
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
      return err;
    }
  }

  async getProducts() {
    try {
      const stock = await fs.promises.readFile(this.#path, "utf-8");
      return JSON.parse(stock);
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async getProductById(productId) {
    try {
      const getStock = await this.getProducts();
      const find = getStock.find((product) => product.id === productId);
      if (find) {
        return find;
      }
    } catch (err) {
      err;
    }
  }

  async deleteProduct(productId) {
    try {
      console.log(productId);
      const products = await this.getProducts();
      const findProduct = products.findIndex(
        (product) => product.id === productId
      );
      if (findProduct === productId) {
        products.splice(findProduct, 1);
        await fs.promises.writeFile(this.#path, JSON.stringify(products));
      } else {
        throw new Error("Product not found");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async updateProduct(productId, dataToUpdate) {
    if (dataToUpdate.hasOwnProperty("id")) {
      await console.log("Error No puede Cambiar Id de producto");
      return await this.updateProduct;
    } else {
      try {
        const products = await this.getProducts();

        const updatedProducts = products.map((p) =>
          p.id === productId ? { ...p, ...dataToUpdate } : p
        );

        await fs.promises.writeFile(
          this.#path,
          JSON.stringify(updatedProducts)
        );
      } catch (err) {
        console.log(err);
      }
    }
  }
}

export default productManager;
