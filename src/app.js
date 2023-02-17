import express from "express";
import ProductManager from "./ProductManager.js";

const manager = new ProductManager("./products.json");

const app = express();

app.get("/products", async (req, res) => {
  const products = await manager.getProducts();
  const {limit} = req.query;  
  const limitedProducts = products.slice(0, limit);
  res.send(limitedProducts)
});

app.get("/products/:id", async (req, res) => {
  const products = await manager.getProducts();
  console.log(products);

  const { id } = req.params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res
      .status(404)
      .send({ error: `Product ${req.params.id} not found` });
  } else {
    res.send(product);
  }
});




app.listen(8080, () => {
  console.log("server listening on");
});
