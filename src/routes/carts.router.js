import { Router, json } from "express";
import { cartsManager } from "../dao/index.js";

const cartManager = new cartsManager();

const cartsRouter = Router();
cartsRouter.use(json());

cartsRouter.post("/", async (req, res) => {
  try {
    await cartManager.addCart();
    res.send({ status: "success", payload: "Carrito añadido." });
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err}` });
  }
});

cartsRouter.get("/", async (req, res) => {
  try {
    const carrito = await cartManager.getCarts();
    res.send({ status: "success", payload: carrito });
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err}` });
  }
});

cartsRouter.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    let cart = await cartManager.getCartProducts(cid);
    res.send({ status: "success", payload: cart });
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err}` });
  }
});

cartsRouter.post("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    let product = await cartManager.addProductToCart(cid, pid);
    res.send({
      status: "success",
      payload: product,
    });
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err}` });
  }
});

cartsRouter.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    let product = await cartManager.deleteProductFromCart(cid, pid);

    if (!product) {
      return res
        .status(404)
        .send({ status: "error", error: "Product not found" });
    }

    res.send({
      status: "success",
      payload: product,
    });
  } catch (err) {
    res.status(500).send({ status: "error", error: `${err}` });
  }
});

cartsRouter.put("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const productsObjet = req.body;
    console.log(productsObjet);
    let product = await cartManager.putProductsArray(cid, productsObjet);
    res.send({
      status: "success",
      payload: product,
    });
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err}` });
  }
});

cartsRouter.put("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    let product = await cartManager.updateQuantity(cid, pid, quantity);
    res.send({
      status: "success",
      payload: product,
    });
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err}` });
  }
});

cartsRouter.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    let deleteCart = await cartManager.deleteAllProductsFromCart(cid);
    res.send({
      status: "success",
      payload: deleteCart,
    });
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err}` });
  }
});

export default cartsRouter;
