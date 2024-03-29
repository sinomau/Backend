import fs from "fs";
import __dirname from "../../utils/utils.js";
import { logger } from "../../utils/logger.js";

class cartsManager {
  #path = __dirname + "/dao/file-managers/files/carts.json";

  constructor(path) {
    this.path = path;
    console.log("Working with Carts file system");
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

  async getCarts() {
    try {
      const carts = await fs.promises.readFile(this.#path, "utf-8");
      return JSON.parse(carts);
    } catch (err) {
      logger.error(err);
      return [];
    }
  }

  async addCart() {
    try {
      let carts = await this.getCarts();
      const cart = {
        id: this.generateId(carts),
        products: [],
      };
      carts = [...carts, cart];
      await fs.promises.writeFile(this.#path, JSON.stringify(carts));
    } catch (err) {
      logger.error(err);
      throw new Error("Cart not added");
    }
  }

  async getCartProducts(cartId) {
    const carts = await this.getCarts();
    const parsedId = parseInt(cartId);
    const find = carts.find((e) => e.id === parsedId);

    if (find) {
      return find;
    } else {
      logger.error(err);
      throw new Error("Product not found");
    }
  }

  async addProductToCart(prod, cartID) {
    try {
      const prodParsed = parseInt(prod);
      const cartIdParsed = parseInt(cartID);

      let carts = await this.getCarts();
      let cart = await this.getCartProducts(cartIdParsed);

      //Verifico si el producto existe en el carrito
      let prodInCart = cart.products.find((p) => p.id === prodParsed.id);

      if (prodInCart) {
        prodInCart.quantity += 1;
        let filterProducts = cart.products.filter(
          (p) => p.id !== prodInCart.id
        );
        filterProducts = [...filterProducts, prodInCart];
        cart.products = filterProducts;
        let newCarts = carts.filter((c) => c.id !== cartIdParsed);
        newCarts = [...newCarts, cart];
        await fs.promises.writeFile(this.#path, JSON.stringify(newCarts));
      } else {
        cart.products = [
          ...cart.products,
          {
            id: prod.id,
            quantity: 1,
          },
        ];
        let newCarts = carts.filter((c) => c.id !== cartIdParsed);
        newCarts = [...newCarts, cart];
        await fs.promises.writeFile(this.#path, JSON.stringify(newCarts));
      }
    } catch (err) {
      logger.error(err);
    }
  }

  async deleteProductCart(cartId, productId) {
    try {
      const carts = await this.getCarts();
      const cartProducts = await this.getCartProducts(productId);

      let prodInCart = carts.find((cart) => cart.id === cartId);
      if (!prodInCart) {
        throw new Error(`Product ${productId} not in cart`);
      }
      if (prodInCart.quantity > 0) {
        prodInCart.quantity -= 1;
        let filterProducts = cartProducts.products.filter(
          (p) => p.id !== productId
        );
        filterProducts = [...filterProducts, prodInCart];

        cart.products = filterProducts;

        let newCarts = [...newCarts, cart];

        await fs.promises.writeFile(this.#path, JSON.stringify(newCarts));
      } else {
        let newCartProducts = cart.products.filter((p) => p.id !== productId);
        cart.products = newCartProducts;
        let newCart = carts.filter((c) => c.id !== cartId);
        newCart = [...newCart, cart];
        await fs.promises.writeFile(this.#path, JSON.stringify(newCart));
      }
    } catch (err) {
      logger.error(err);
    }
  }
}
export default cartsManager;
