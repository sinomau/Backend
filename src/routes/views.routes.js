import { Router } from "express";
import {
  chatViewController,
  loginViewController,
  signupViewController,
  profileViewController,
  failureSignupViewController,
  realTimeProductsViewController,
  productsViewController,
  cartsViewController,
} from "../controllers/views.controller.js";

const viewsRouter = Router();

viewsRouter.get("/chat", chatViewController);

viewsRouter.get("/", loginViewController);

viewsRouter.get("/signup", signupViewController);

viewsRouter.get("/profile", profileViewController);

viewsRouter.get("/failure-signup", failureSignupViewController);

//view realtime products

viewsRouter.get("/real-time-products", realTimeProductsViewController);

viewsRouter.get("/products", productsViewController);

viewsRouter.get("/carts", cartsViewController);

export default viewsRouter;
