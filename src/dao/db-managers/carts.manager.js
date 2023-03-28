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
      const newCart = { products: [] };
      const addCart = await cartModel.create(newCart);
      return addCart;
    } catch (err) {
      throw new Error("Cart not added");
    }
  }

  async getCartProducts(cartId) {
    const find = await cartModel.findById(cartId);
    if (find) {
      return find;
    } else {
      throw new Error("Product not found");
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const findProduct = await cartModel.findById(cartId);
      const existProduct = findProduct.products.find(
        (p) => p.productId === productId
      );
      let updateProduct;

      if (existProduct) {
        updateProduct = findProduct.products.map((p) => {
          if (p.productId === productId) {
            return{
              ...p,
              quantity: p.quantity + 1
            }
          }
        });
      } else {
        updateProduct = [...findProduct.products, { productId, quantity: 1 }];
      }
      findProduct.products = updateProduct;

      return findProduct.save();
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default cartsManager;
