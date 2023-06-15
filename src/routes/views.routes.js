import { Router } from "express";
import { checkRole } from "../middlewares/auth.js";
import {
  chatViewController,
  loginViewController,
  signupViewController,
  profileViewController,
  failureSignupViewController,
  realTimeProductsViewController,
  productsViewController,
  cartsViewController,
  resetPasswordViewController,
  forgotPasswordViewController
} from "../controllers/views.controller.js";

const viewsRouter = Router();

viewsRouter.get("/chat",checkRole(["user"]), chatViewController);

viewsRouter.get("/", loginViewController);

viewsRouter.get("/forgot-password", forgotPasswordViewController );

viewsRouter.get("/reset-password", resetPasswordViewController);

viewsRouter.get("/signup", signupViewController);

viewsRouter.get("/profile",checkRole(["user","admin"]), profileViewController);

viewsRouter.get("/failure-signup", failureSignupViewController);

//view realtime products

viewsRouter.get("/real-time-products",checkRole(["user","admin"]), realTimeProductsViewController);

viewsRouter.get("/products",checkRole(["user","admin"]), productsViewController);

viewsRouter.get("/carts",checkRole(["user","admin"]), cartsViewController);

export default viewsRouter;
