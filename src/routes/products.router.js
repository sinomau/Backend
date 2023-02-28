import { Router, json } from "express";
import productManager from "../product.manager.js";

const manager = new productManager("./src/products.json");

const productsRouter = Router();

productsRouter.use(json());

productsRouter.get("/", async (req, res) => {
  const products = await manager.getProducts();
  const { limit } = req.query;
  if (limit) {
    const limitedProducts = products.slice(0, limit);
    res.send(limitedProducts);
  } else {
    res.send(products);
  }
});

productsRouter.get("/:pid", async (req, res) => {
  const idProduct = req.params.pid;
  const findProduct = await manager.getProductById(idProduct);

  if (!findProduct) {
    return res.status(404).send({ error: `Product ${idProduct} not found` });
  } else {
    res.send(findProduct);
  }
});

productsRouter.post("/", async (req, res) => {
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

productsRouter.put("/:id", async (req, res) => {
  const productId = req.params.id;
  const newProduct = req.body;

  const updateProducts = await manager.updateProduct(productId, ...newProduct);

  res.send(updateProducts);
});

productsRouter.delete("/:id", async (req, res) => {
  const deleteId = req.params.id;
  const deleteProduct = await manager.deleteProduct(deleteId);
  res.send(deleteProduct);
});

export default productsRouter;
