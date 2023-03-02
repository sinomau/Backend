import fs from "fs";

class cartsManager {
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

  async getCarts() {
    try {
      const carts = await fs.promises.readFile(this.#path, "utf-8");
      return JSON.parse(carts);
    } catch (e) {
      console.log(e);
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
      throw new Error("Product not added");
    }
  }

  async getCartProducts(productId) {
    const carts = await this.getCarts();
    const find = carts.find((cart) => cart.id === productId);
    if (find) {
      return find;
    } else {
      throw new Error("Product not found");
    }
  }

  async addProductToCart(prod, cartID) {
    try {
      let carts = await this.getCarts();
      let cart = await this.getCartProducts(cartID);

      //Verifico si el producto existe en el carrito
      let prodInCart = cart.products.find((p) => p.id === prod.id);

      if (prodInCart) {
        prodInCart.quantity += 1;
        let filterProducts = cart.products.filter(
          (p) => p.id !== prodInCart.id
        );
        filterProducts = [...filterProducts, prodInCart];
        cart.products = filterProducts;
        let newCarts = carts.filter((c) => c.id !== cartID);
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
        let newCarts = carts.filter((c) => c.id !== cartID);
        newCarts = [...newCarts, cart];
        await fs.promises.writeFile(this.#path, JSON.stringify(newCarts));
      }
    } catch (err) {
      throw new Error(err);
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
      throw new Error(err);
    }
  }
}
export default cartsManager;
