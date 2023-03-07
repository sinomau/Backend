import { Router, json } from "express";
import ProductManager from "../product.manager.js";

const item = new ProductManager("./src/products.json");

const viewer = Router();

viewer.get("/", async (req,res) =>{
    const products = await item.getProducts();
    res.render("home", {products});
})

viewer.get('/realTime', (req, res) => {
    res.render('real_time_products');
});


export default viewer;