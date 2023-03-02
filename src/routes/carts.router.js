import { Router, json } from "express";
import cartsManager from "../carts.manager.js";

const manager = new cartsManager("./src/carts.json");

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

cartsRouter.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    let cart = await manager.getCartProducts(parseInt(cid));
    res.send({ status: "success", payload: cart });
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err}` });
  }
});

cartsRouter.post("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const prodID = parseInt(pid);
    const cartID = parseInt(cid);
    let product = await manager.getCartProducts(prodID);
    await manager.addProductToCart(product, cartID);
    res.send({
      status: "success",
      payload: await manager.getCartProducts(cartID),
    });
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err}` });
  }
});

export default cartsRouter;
