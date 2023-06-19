import {
  getCartsService,
  addCartService,
  getCartProductsService,
  addProductToCartService,
  deleteProductFromCartService,
  putProductsArrayService,
  updateProductQuantityService,
  deleteAllProductsFromCartService,
  purchaseCartService,
  createTicketService,
} from "../service/carts.service.js";
import { getProductByIdService } from "../service/products.service.js";

export const addCartController = async (req, res) => {
  let cart = await addCartService();
  res.json({ status: "success", message: "Cart created", data: cart });
};

export const getCartsController = async (req, res) => {
  let carts = await getCartsService();
  res.json({ status: "success", message: "Carts listed", data: carts });
};

export const getCartProductsController = async (req, res) => {
  let cart = await getCartProductsService(req.params.cid);
  res.json({ status: "success", message: "Cart listed", data: cart });
};

export const addProductToCartController = async (req, res) => {
  const findProduct = await getProductByIdService(req.params.pid);
  console.log(findProduct)
  if (findProduct) {
    const productOwner = JSON.parse(JSON.stringify(findProduct.owner));
    const userId = JSON.parse(JSON.stringify(req.user._id));
    if (productOwner == userId && req.user.role === "premium") {
      res.json({ status: "fail", message: "You can't buy your own product" });
    } else {
      let cart = await addProductToCartService(req.params.cid, req.params.pid);
      res.json({
        status: "success",
        message: "Product added to cart",
        data: cart,
      });
    }
  } else {
    let cart = await addProductToCartService(req.params.cid, req.params.pid);
    res.json({
      status: "success",
      message: "Product added to cart",
      data: cart,
    });
  }
};

export const deleteProductFromCartController = async (req, res) => {
  let cart = await deleteProductFromCartService(req.params.cid, req.params.pid);
  res.json({
    status: "success",
    message: "Product deleted from cart",
    data: cart,
  });
};

export const addProductArrayToCartController = async (req, res) => {
  let cart = await putProductsArrayService(req.params.cid, req.body.products);
  res.json({
    status: "success",
    message: "Products added to cart",
    data: cart,
  });
};

export const updateQuantityController = async (req, res) => {
  let cart = await updateProductQuantityService(
    req.params.cid,
    req.params.pid,
    req.body.quantity
  );
  res.json({
    status: "success",
    message: "Product quantity updated",
    data: cart,
  });
};

export const deleteCartController = async (req, res) => {
  let cart = await deleteAllProductsFromCartService(req.params.cid);
  res.json({ status: "success", message: "Cart deleted", data: cart });
};

export const purchaseCartController = async (req, res) => {
  let cid = req.params.cid;
  let cart = await purchaseCartService(cid, req);
  res.json({ status: "success", message: "Cart listed", data: cart });
};

export const createTicketController = async (req, res) => {
  let ticket = req.body;
  let cart = await createTicketService(ticket);
  res.json({ status: "success", message: "Ticket created", data: cart });
};
