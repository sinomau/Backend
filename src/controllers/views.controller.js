import { Router, json } from "express";
import { productManager } from "../dao/index.js";
import { cartsManager } from "../dao/index.js";
import productModel from "../dao/models/products.model.js";
import { userModel } from "../dao/models/user.model.js";
import path from "path";
import { __dirname } from "../utils/utils.js";

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
  const avatar = req.user.avatar;
  res.render("profile", { user, role, cart, avatar });
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
  const avatar = req.user.avatar;

  const products = await productModel.paginate(
    {},
    { limit: 3, lean: true, page: page ?? 1 }
  );
  res.render("products", { products, user, role, cart, avatar });
};

export const cartsViewController = async (req, res) => {
  const userCart = req.user.cart;
  const carts = await cartManager.getCartProducts(userCart);

  if (carts) {
    const cartId = carts._id;
    const prodsInCart = carts.products;
    const id = carts._id;
    const idToString = id.toString();
    res.render("carts", { prodsInCart, idToString, cartId });
  } else {
    res.render("carts", { prodsInCart: [] });
  }
};

export const resetPasswordViewController = async (req, res) => {
  const token = req.query.token;
  res.render("resetPassword", { token });
};

export const forgotPasswordViewController = async (req, res) => {
  res.render("forgotPassword");
};

export const usersViewController = async (req, res) => {
  res.render("users");
};
