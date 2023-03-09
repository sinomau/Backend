import { Router } from "express";
import ProductManager from "../product.manager.js";

const manager = new ProductManager("./src/products.json");

const viewer = Router();

viewer.get("/", async (req, res) => {
  const products = await manager.getProducts();
  res.render("home", { products });
});

viewer.get("/real-time-products", async (req, res) => {
  const products = await manager.getProducts();
  res.render("real_time_products", { products });
});

export default viewer;
