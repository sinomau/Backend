import { Router } from "express";
import {
  getProductsController,
  getProductByIdController,
  addProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/products.controller.js";

const productsRouter = Router();

productsRouter.get("/", getProductsController);

productsRouter.get("/:pid", getProductByIdController);

productsRouter.post("/", addProductController);

productsRouter.put("/:id", updateProductController);

productsRouter.delete("/:id", deleteProductController);

export default productsRouter;
