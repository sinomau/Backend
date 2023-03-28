import { Router, json } from "express";
import { productManager } from "../dao/index.js";

const manager = new productManager();

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
    const getProductById = await manager.getProductById(pid);
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

  const addProduct = await manager.addProduct({
    title,
    description,
    code,
    price,
    status: true,
    stock,
    category,
    thumbnail: "",
  });

  res.status(201).send({ status: "success", payload: addProduct });

  req.io.emit("new-product", req.body);
});

productsRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateProduct = await manager.updateProduct(id, req.body);
    res.send({ status: "success", payload: updateProduct });
    req.io.emit("update-product", req.body);
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err}` });
  }
});

productsRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    await manager.deleteProduct(id);
    const products = await manager.getProducts();
    req.io.emit("delete-product", products);
    res.send({ status: "succes", payload: "Producto eliminado" });
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err}` });
  }
});

export default productsRouter;
