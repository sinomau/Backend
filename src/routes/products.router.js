import { Router, json } from "express";
import productManager from "../product.manager.js";

const manager = new productManager("./src/products.json");

const productsRouter = Router();

productsRouter.use(json());

productsRouter.get("/", async (req, res) => {
  try {
    const products = await manager.getProducts();
    const { limit } = req.query;
    if (limit) {
      const limitedProducts = products.slice(0, limit);
      return res.send({ status: "success", payload: limitedProducts });
    } else {
      res.send({ status: "success", payload: products });
      }
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err}` });
  }
});

productsRouter.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const getProductById = await manager.getProductById(parseInt(pid));
    res.send({ status: "succes", payload: getProductById });
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err}` });
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
  try {
    const { id } = req.params;
    const updateProduct = await manager.updateProduct(parseInt(id), req.body);
    res.send({ status: "success", payload: updateProduct });
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err}` });
  }
});

productsRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const idParsed = parseInt(id);
    await manager.deleteProduct(idParsed);
    res.send({ status: "succes", payload: "Producto eliminado" });
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err}` });
  }
});

export default productsRouter;
