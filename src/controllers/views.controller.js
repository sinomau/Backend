import { Router, json } from "express";
import { productManager } from "../dao/index.js";
import { cartsManager } from "../dao/index.js";
import productModel from "../dao/models/products.model.js";

const prodManager = new productManager();
const cartManager = new cartsManager();

const viewer = Router();
viewer.use(json());

export const chatViewController = async (req, res) => {
  res.render("chat");
};

export const loginViewController = async (req, res) => {
  res.render("login");
};

export const signupViewController = async (req, res) => {
  res.render("signup");
};

export const profileViewController = async (req, res) => {
  const user = req.user.email;
  const role = req.user.role;
  const cart = req.user.cart;
  res.render("profile", { user, role, cart });
};

export const failureSignupViewController = async (req, res) => {
  res.render("failure-signup");
};

//view realtime products
export const realTimeProductsViewController = async (req, res) => {
  const products = await prodManager.getProducts();
  res.render("real_time_products", { products });
};

export const productsViewController = async (req, res) => {
  const { page } = req.query;
  const user = req.user.email;
  const role = req.user.role;
  const cart = req.user.cart;
  console.log(cart);
  const products = await productModel.paginate(
    {},
    { limit: 3, lean: true, page: page ?? 1 }
  );
  res.render("products", { products, user, role, cart });
};

export const cartsViewController = async (req, res) => {
  let cartId = req.query.cartId;
  const carts = await cartManager.getCartProducts(cartId);
  if (carts) {
    const prodsInCart = carts.products;
    console.log(prodsInCart);
    res.render("carts", { prodsInCart });
  } else {
    res.render("carts", { prodsInCart: [] });
  }
};
