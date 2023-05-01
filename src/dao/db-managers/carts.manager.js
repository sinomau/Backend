import __dirname from "../../utils.js";
import cartModel from "../models/carts.model.js";



class cartsManager {
  #path = __dirname + "/dao/file-managers/files/carts.json";

  constructor(path) {
    this.path = path;
    console.log("Working with Carts DB system");
  }

  async getCarts() {
    try {
      const carts = await cartModel.find().lean();
      return carts;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async addCart() {
    try {
      const addCart = await cartModel.create({});
      return addCart;
    } catch (err) {
      throw new Error("Cart not added");
    }
  }

  async getCartProducts(cartId) {
    try {
      const cart = await cartModel
        .findById(cartId)
        .lean()
        .populate("products.product");
      return cart;
    } catch (err) {
      return [];
    }
  }
  async addProductToCart(cartId, productId) {
    try {
      const findProduct = await cartModel
        .findById(cartId)
        .populate("products.product");

      const existingProductIndex = findProduct.products.findIndex(
        (p) => p.product._id.toString() === productId
      );

      if (existingProductIndex !== -1) {
        findProduct.products[existingProductIndex].quantity += 1;
      } else {
        findProduct.products.push({ product: productId, quantity: 1 });
      }

      return await findProduct.save();
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteProductFromCart(cartId, productId) {
    const cart = await cartModel.findById(cartId);
    console.log(cart);
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) => p.product._id.toString() === productId
      );

      if (productIndex !== -1) {
        cart.products[productIndex].quantity -= 1;
        if (cart.products[productIndex].quantity <= 0) {
          cart.products.splice(productIndex, 1);
        }
        await cart.save();
        return cart;
      }
    }
  }

  async putProductsArray(cartId, productsObjet) {
    try {
      const findCart = await cartModel.findById(cartId);
      findCart.products.push(productsObjet);
      return findCart.save();
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateQuantity(cartId, productId, quantity) {
    try {
      const findCart = await cartModel.findById(cartId);
      const product = findCart.products.find((p) => p.productId === productId);

      if (product) {
        product.quantity = quantity;
      }

      const updateCart = await findCart.save();
      return updateCart;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteAllProductsFromCart(cartId) {
    try {
      const findCart = await cartModel.findByIdAndDelete(cartId);
      findCart.products = [];
      return findCart.save();
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default cartsManager;
