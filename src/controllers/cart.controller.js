import { Router, json } from "express";
import { cartsManager } from "../dao/index.js";

const cartManager = new cartsManager();

const cartsRouter = Router();
cartsRouter.use(json());

export const addCartController = async (req, res) => {
  try {
    await cartManager.addCart();
    res.send({ status: "success", payload: "Carrito añadido." });
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err}` });
  }
};

export const getCartsController = async (req, res) => {
  try {
    const cart = await cartManager.getCarts();
    res.send({ status: "success", payload: cart });
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err}` });
  }
};

export const getCartProductsController = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getCartProducts(cid);
    res.send({ status: "success", payload: cart });
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err}` });
  }
};

export const addProductToCartController = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    let product = await cartManager.addProductToCart(cid, pid);
    res.send({ status: "success", payload: product });
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err}` });
  }
};

export const deleteProductFromCartController = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    let product = await cartManager.deleteProductFromCart(cid, pid);
    if (!product) {
      return res
        .status(404)
        .send({ status: "error", error: "Product not found" });
    }
    res.send({ status: "success", payload: product });
  } catch (err) {
    res.status(500).send({ status: "error", error: `${err}` });
  }
};

export const addProductArrayToCartController = async (req, res) => {
  try {
    const { cid } = req.params;
    const productsObjet = req.body;
    console.log(productsObjet);
    let product = await cartManager.addProductsArray(cid, productsObjet);
    res.send({ status: "success", payload: product });
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err}` });
  }
};

export const updateQuantityController = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    let product = await cartManager.updateQuantity(cid, pid, quantity);
    res.send({ status: "success", payload: product });
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err}` });
  }
};

export const deleteCartController = async (req, res) => {
  try {
    const { cid } = req.params;
    let deleteCart = await cartManager.deleteCart(cid);
    res.send({
      status: "success",
      payload: deleteCart,
    });
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err}` });
  }
};

export default cartsRouter;
