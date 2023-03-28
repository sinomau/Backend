import { Router } from "express";
import { productManager } from "../dao/index.js";
import chatManager from "../dao/db-managers/chat.manager.js";

const manager = new productManager();
const managerChat = new chatManager();

const viewer = Router();

viewer.get("/", async (req, res) => {
  const products = await manager.getProducts();
  res.render("home", { products });
});

viewer.get("/real-time-products", async (req, res) => {
  const products = await manager.getProducts();
  res.render("real_time_products", { products });
});

viewer.get("/chat", async (req, res) => {
  const messages = await managerChat.getMessages();
  res.render("chat", { messages });
});

export default viewer;
