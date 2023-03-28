import { Router, json } from "express";
import { cartsManager } from "../dao/index.js";

const manager = new cartsManager();

const cartsRouter = Router();
cartsRouter.use(json());

cartsRouter.post("/", async (req, res) => {
  try {
    await manager.addCart();
    res.send({ status: "success", payload: "Carrito añadido." });
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err}` });
  }
});

cartsRouter.get("/", async (req, res) => {
  try {
    const carrito = await manager.getCarts();
    res.send({ status: "success", payload: carrito });
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err}` });
  }
});

cartsRouter.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    let cart = await manager.getCartProducts(cid);
    res.send({ status: "success", payload: cart });
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err}` });
  }
});

cartsRouter.post("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    let product = await manager.addProductToCart(cid, pid);
    res.send({
      status: "success",
      payload: product,
    });
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err}` });
  }
});

export default cartsRouter;
