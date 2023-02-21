import express from "express";
import ProductManager from "./ProductManager.js";

const manager = new ProductManager("./products.json");

const app = express();

app.get("/products", async (req, res) => {
  const products = await manager.getProducts();
  const { limit } = req.query;
  if (limit) {
    const limitedProducts = products.slice(0, limit);
    res.send(limitedProducts);
  } else {
    res.send(products);
  }
});

app.get("/products/:id", async (req, res) => {
  const findProduct = await manager.getProductById(req.params.id);
  const { id } = req.params;

  if (!id) {
    return res
      .status(404)
      .send({ error: `Product ${req.params.id} not found` });
  } else {
    res.send(findProduct);
  }
});

app.listen(8080, () => {
  console.log("server listening on");
});
