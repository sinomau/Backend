import fs from "fs";

class productManager {
  #path;

  constructor(path) {
    this.#path = path;
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
    const getStock = await this.getProducts();
    const find = getStock.find((product) => product.id === productId);
    if (find) {
      return find;
    } else {
      throw new Error("Product not found");
    }
  }

  async deleteProduct(productId) {
    try {
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
    try {
      console.log(productId);
      const products = await this.getProducts();
      console.log(products);
      const findProduct = products.find((product) => product.id === productId);

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
    } catch (err) {
      console.log(err);
    }
  }
}

export default productManager;
