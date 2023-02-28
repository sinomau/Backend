import { Router, json } from "express";
import cartsManager from "../carts.manager.js";
const cartsRouter = Router();
const manager = new cartsManager("./src/carts.json");

cartsRouter.use(json());

cartsRouter.get("/", async (req, res) => {
  const products = await manager.getProducts();
  const { limit } = req.query;
  if (limit) {
    const limitedProducts = products.slice(0, limit);
    res.send(limitedProducts);
  } else {
    res.send(products);
  }
});

cartsRouter.get("/:cid", async (req, res) => {
  const idCart = req.params.pid;
  const findCart = await manager.getProductById(idCart);

  if (!idCart) {
    return res.status(404).send({ error: `Cart ${idCart} not found` });
  } else {
    res.send(findCart);
  }
});

cartsRouter.post("/", async (req, res) => {
  const products = [req.body];

  const addProduct = await manager.addProduct(products);

  res.json(addProduct);
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail,
  } = req.body;
  const addProduct = await manager.addProduct(
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail
  );

  res.json(addProduct);
});


export default cartsRouter;
