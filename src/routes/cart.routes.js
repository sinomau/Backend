import { Router } from "express";
import { checkRole } from "../middlewares/auth.js";
import {
  addCartController,
  getCartsController,
  getCartProductsController,
  addProductToCartController,
  deleteProductFromCartController,
  addProductArrayToCartController,
  updateQuantityController,
  deleteCartController,
  purchaseCartController,
} from "../controllers/cart.controller.js";

const cartsRouter = Router();

cartsRouter.post("/", addCartController);

cartsRouter.get("/", getCartsController);

cartsRouter.get("/:cid", getCartProductsController);

cartsRouter.post("/:cid/products/:pid", addProductToCartController);

cartsRouter.delete("/:cid/products/:pid", deleteProductFromCartController);

cartsRouter.put("/:cid/products/:pid", addProductArrayToCartController);

cartsRouter.put("/:cid/products/:pid", updateQuantityController);

cartsRouter.post("/:cid/purchase",purchaseCartController);

cartsRouter.delete("/:cid", deleteCartController);

export default cartsRouter;
