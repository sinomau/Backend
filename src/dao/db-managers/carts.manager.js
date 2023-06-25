import __dirname from "../..//utils/utils.js";
import cartModel from "../models/carts.model.js";
import { v4 as uuidv4 } from "uuid";
import productsModel from "../models/products.model.js";
import { ticketsModel } from "../models/ticket.models.js";
import { transporter } from "../../config/gmail.js";
import { logger } from "../../utils/logger.js";

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
      console.log(findCart)
      if (!findCart) {
        throw new Error("Carrito no encontrado");
      }
      findCart.products.push(productsObjet);
      return findCart.save();
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateQuantity(cartId, productId, quantity) {
    try {
      const findCart = await cartModel.findById(cartId);
      findCart.products.forEach((product) => {
        if (product.product == productId) {
          product.quantity = quantity;
        }
      });
      return findCart.save();
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

  async purchaseCart(cartId, req) {
    try {
      const findCart = await cartModel.findById(cartId);
      if (findCart.products.length == 0) {
        logger.error("Carrito vacio");
      }
      if (!findCart) {
        logger.error("Carrito no encontrado");
      }

      let ticketsProducts = [];
      let rejectedProducts = [];

      for (let i = 0; i < findCart.products.length; i++) {
        const cartProduct = findCart.products[i];
        const productDB = await productsModel.findById(cartProduct.product._id);
        if (productDB.stock >= cartProduct.quantity) {
          ticketsProducts.push(cartProduct);

          productDB.stock -= cartProduct.quantity;
          await productDB.save();
        } else {
          rejectedProducts.push("SIN STOCK", cartProduct);
        }

        const newTicket = {
          code: uuidv4(),
          purchase_datetime: new Date(),
          amount: ticketsProducts.reduce(
            (acc, curr) => acc + curr.quantity * curr.product.price,
            0
          ),
          purchaser: req.user.email,
        };

        const ticket = await ticketsModel.create(newTicket);
        const mailTemplate = `<div>
        <h1>Gracias por su compra</h1>
        <h2>Detalle de la compra</h2>
        <ul>
          ${ticketsProducts.map(
            (product) =>
              `<li>${product.product.title} - ${product.quantity} Unidades - $${
                product.product.price * product.quantity
              }</li>`
          )}
        </ul>
        <h3>Total: $${newTicket.amount}</h3>
        <h3>Codigo de compra: ${newTicket.code}</h3>
        </div>`;

        await transporter.sendMail({
          from: "Ecommerce",
          to: req.user.email,
          subject: "Gracias por su compra",
          html: mailTemplate,
        });

        if (ticket)
          for (let i = 0; i < ticketsProducts.length; i++) {
            const ticketProduct = ticketsProducts[i];
            //delete from cart ticketProduct
            await this.deleteProductFromCart(cartId, ticketProduct.product._id);
          }

        if (rejectedProducts.length) {
          return rejectedProducts;
        }
      }
    } catch (err) {
      logger.error(err);
    }
  }
}

export default cartsManager;
