import {
  getProductService,
  getProductByIdService,
  addProductService,
  updateProductService,
  deleteProductService,
  getProductsByCategoryService,
  orderProductByPriceService,
} from "../service/products.service.js";

export const getProductsController = async (req, res) => {
  try {
    const products = await getProductService();
    const { limit } = req.query;
    if (limit) {
      products.length = limit;
      return res.send({ status: "success", payload: products });
    }
    res.send({ status: "success", payload: products });
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err}` });
  }
};

export const getProductByIdController = async (req, res) => {
  try {
    let pid = req.params.pid;
    const product = await getProductByIdService(pid);
    res.send({ status: "success", payload: product });
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err}` });
  }
};

export const addProductController = async (req, res) => {
  try {
    const { code, title, description, price, thumbnail, stock, category } =
      req.body;
    const product = await addProductService({
      code,
      title,
      description,
      price,
      thumbnail,
      stock,
      category,
    });
    res.send({ status: "success", payload: product });
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err}` });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, title, description, price, thumbnail, stock, category } =
      req.body;

    const product = await updateProductService(id, {
      code,
      title,
      description,
      price,
      thumbnail,
      stock,
      category,
    });
    res.send({ status: "success", payload: product });
  } catch (err) {
    console.log(err);
    res.status(404).send({ status: "error", error: `${err}` });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await deleteProductService(id);
    res.send({ status: "success", payload: product });
  } catch (err) {
    console.log(err);
    res.status(404).send({ status: "error", error: `${err}` });
  }
};

export const getProductsByCategoryController = async (req, res) => {
  try {
    let cat = req.params.cat;
    const products = await getProductsByCategoryService(cat);
    res.send({ status: "success", payload: products });
  } catch (err) {
    console.log(err);

    res.status(404).send({ status: "error", error: `${err}` });
  }
};
export const orderProductByPriceController = async (req, res) => {
  try {
    let num = req.params.num;
    if (num === "asc") {
      const products = await orderProductByPriceService(1);
      res.send({ status: "ok", payload: products });
    } else if (num === "desc") {
      const products = await orderProductByPriceService(-1);
      res.send({ status: "ok", payload: products });
    } else {
      res.send({ status: "ok", payload: await getProductService() });
    }
  } catch (err) {
    console.log(err);

    res.status(404).send({ status: "error", error: `${err}` });
  }
};
