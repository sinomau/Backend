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

      const existProduct = findProduct.products.find(
        (p) => p.productId === productId
      );

      let updateProduct;

      if (existProduct) {
        updateProduct = findProduct.products.map((p) => {
          if (p.productId === productId) {
            return {
              ...p,
              quantity: p.quantity + 1,
            };
          }
        });
      } else {
        updateProduct = [...findProduct.products, { productId, quantity: 1 }];
      }
      findProduct.products.push({ product: productId });

      return findProduct.save();
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteProductFromCart(cartId, productId) {
    const cart = await cartModel.findById(cartId);
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) => p.productId === productId
      );
      if (productIndex !== -1) {
        cart.products.splice(productIndex, 1);
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
      const findCart = await cartModel.findById(cartId);
      findCart.products = [];
      return findCart.save();
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default cartsManager;
