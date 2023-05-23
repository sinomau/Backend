import { Router } from "express";
import { checkRole } from "../middlewares/auth.js";
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

productsRouter.post("/",checkRole(["admin"]), addProductController);

productsRouter.put("/:id",checkRole(["admin"]), updateProductController);

productsRouter.delete("/:id",checkRole(["admin"]), deleteProductController);

export default productsRouter;
