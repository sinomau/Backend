import { Router } from "express";
import { checkRole } from "../middlewares/auth.js";
import {
  getProductsController,
  getProductByIdController,
  addProductController,
  updateProductController,
  deleteProductController,
  getProductsByCategoryController,
  orderProductByPriceController,
  mockingProductsController,
} from "../controllers/products.controller.js";

const productsRouter = Router();

productsRouter.get("/", getProductsController);

productsRouter.get("/:pid", getProductByIdController);

productsRouter.post("/",checkRole(["admin","premium"]), addProductController);

productsRouter.put("/:id", checkRole(["admin"]), updateProductController);

productsRouter.delete("/:id", checkRole(["admin","premium"]), deleteProductController);

productsRouter.get("/category/:cat", getProductsByCategoryController);

productsRouter.get("/price/:num", orderProductByPriceController);

productsRouter.get("/mocking/mockingproducts", mockingProductsController);

export default productsRouter;
