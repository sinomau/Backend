import CartsManager from "../dao/db-managers/carts.manager.js";
import ticketsManager from "../dao/db-managers/tickets.manager.js";

const cartsManager = new CartsManager();

export async function getCartsService() {
  let cart = await cartsManager.getCarts();
  return cart;
}

export async function addCartService() {
  let cart = await cartsManager.addCart();
  return cart;
}

export async function getCartProductsService(cartId) {
  let cart = await cartsManager.getCartProducts(cartId);
  return cart;
}

export async function addProductToCartService(cartId, productId) {
  let cart = await cartsManager.addProductToCart(cartId, productId);
  return cart;
}

export async function deleteProductFromCartService(cartId, productId) {
  let cart = await cartsManager.deleteProductFromCart(cartId, productId);
  return cart;
}

export async function putProductsArrayService(cartId, products) {
  let cart = await cartsManager.putProductsArray(cartId, products);
  return cart;
}

export async function updateProductQuantityService(
  cartId,
  productId,
  quantity
) {
  let cart = await cartsManager.updateQuantity(cartId, productId, quantity);
  return cart;
}

export async function deleteAllProductsFromCartService(cartId) {
  let cart = await cartsManager.deleteAllProductsFromCart(cartId);
  return cart;
}

export async function purchaseCartService(cartId,req) {
  let cart = await cartsManager.purchaseCart(cartId,req);
  return cart;
}


export async function createTicketService(ticket) {
  let cart = await ticketsManager.createTicket(ticket);
  return cart;
}
