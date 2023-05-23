import __dirname from "../../utils.js";
import cartModel from "../models/carts.model.js";
import { ticketsModel } from "../models/ticket.models.js";

class cartsManager {
  #path = __dirname + "/dao/file-managers/files/carts.json";

  constructor(path) {
    this.path = path;
    console.log("Working with Carts DB system");
  }

  async getCarts() {
    try {
      const carts = await cartModel.find().lean().populate("products.product");
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
      const cart = await cartModel
        .findById(cartId)
        .populate("products.product");
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
      const productIndex = cart.products.findIndex(
        (p) => p.product._id.toString() === productId.toString()
      );

      if (productIndex === -1) {
        // El producto no existe en el carrito, agregarlo con cantidad inicial 1
        cart.products.push({
          product: productId,
          quantity: 1,
        });
      } else {
        // El producto ya existe en el carrito, incrementar la cantidad en 1
        cart.products[productIndex].quantity += 1;
      }

      return cart.save();
    } catch (err) {
      throw new Error(err);
    }
  }
  async deleteProductFromCart(cartId, productId) {
    try {
      const cart = await cartModel
        .findById(cartId)
        .populate("products.product");
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
      const productIndex = cart.products.findIndex(
        (p) => p.product._id.toString() === productId.toString()
      );

      if (productIndex === -1) {
        return null;
      } else {
        // El producto ya existe en el carrito, incrementar la cantidad en 1
        cart.products.splice(productIndex, 1);
      }

      return cart.save();
    } catch (err) {
      throw new Error(err);
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

  async updateQuantity(cartId, productId) {
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

  async createTicket(ticket) {
    try {
      const newTicket = await ticketsModel.create(ticket);
      newTicket.save();

    } catch (err) {
      throw new Error(err);
    }
  }
}

export default cartsManager;
