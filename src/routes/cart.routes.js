import  { Router } from "express";
import {
  addCartController,
  getCartsController,
  getCartProductsController,
  addProductToCartController,
  deleteProductFromCartController,
  addProductArrayToCartController,
  updateQuantityController,
  deleteCartController,
} from "../controllers/cart.controller.js";

const cartsRouter = Router();

cartsRouter.post("/", addCartController);

cartsRouter.get("/", getCartsController);

cartsRouter.get("/:cid/products", getCartProductsController);

cartsRouter.post("/:cid/products/:pid", addProductToCartController);

cartsRouter.delete("/:cid/products/:pid", deleteProductFromCartController);

cartsRouter.put(
  "/:cid/products/:pid",
  addProductArrayToCartController
);

cartsRouter.put(
  "/:cid/products/:pid",
  updateQuantityController
);

cartsRouter.delete("/:cid", deleteCartController);


export default cartsRouter;