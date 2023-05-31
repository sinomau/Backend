import {
  getProductService,
  getProductByIdService,
  addProductService,
  updateProductService,
  deleteProductService,
  getProductsByCategoryService,
  orderProductByPriceService,
  mockingProductsService,
} from "../service/products.service.js";

import { CustomError } from "../service/customError.service.js";
import { userAuthError } from "../service/authError.service.js";
import { EError } from "../enums/EError.js";

export const getProductsController = async (req, res) => {
  try {
    if (!req.user) {
      throw CustomError.createError({
        name: "User Not Logged",
        message: "El usuario debe estar logueado para acceder a esta ruta",
        errorCode: EError.UserNotLogged,
      });
    }
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
    if (req.user.role === "user") {
      throw CustomError.createError({
        name: "is not admin",
        message: userAuthError(req.user),
        errorCode: EError.userAuthError,
      });
    }
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
    if (req.user.role === "user") {
      throw CustomError.createError({
        name: "is not admin",
        message: userAuthError(req.user),
        errorCode: EError.userAuthError,
      });
    }
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
    if (req.user.role === "user") {
      throw CustomError.createError({
        name: "is not admin",
        message: userAuthError(req.user),
        errorCode: EError.userAuthError,
      });
    }
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

export const mockingProductsController = async (req, res) => {
  try {
    const mocking = await mockingProductsService();
    res.send({ status: "success", payload: mocking });
  } catch (err) {
    console.log(err);
    res.status(404).send({ status: "error", error: `${err}` });
  }
};
