import { Router, json } from "express";
import { productManager } from "../dao/index.js";
import { cartsManager } from "../dao/index.js";
import productModel from "../dao/models/products.model.js";

const prodManager = new productManager();
const cartManager = new cartsManager();

const viewer = Router();
viewer.use(json());

viewer.get("/", async (req, res) => {
  res.render("login");
});

viewer.get("/signup", async (req, res) => {
  res.render("signup");
});

viewer.get("/profile", async (req, res) => {
  res.render("profile");
});

viewer.get("/failure-signup", async (req, res) => {
  res.render("failure-signup");
});

//view realtime products
viewer.get("/real-time-products", async (req, res) => {
  const products = await prodManager.getProducts();
  res.render("real_time_products", { products });
});

viewer.get("/products", async (req, res) => {
  const { page } = req.query;
  const user = req.session.user
  const role = req.session.role;
  const products = await productModel.paginate(
    {},
    { limit: 3, lean: true, page: page ?? 1 }
  );
  res.render("products", { products, user, role });
});

viewer.get("/carts", async (req, res) => {
  let cartId = req.query.cartId;
  const carts = await cartManager.getCartProducts(cartId);
  if (carts) {
    const prodsInCart = carts.products;
    res.render("carts", { prodsInCart });
  } else {
    res.render("carts", { prodsInCart: [] });
  }
});

export default viewer;
