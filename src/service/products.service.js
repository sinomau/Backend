import productManager from "../dao/db-managers/product.manager.js";

const manager = new productManager();

export async function getProductService() {
  const products = await manager.getProducts();
  return products;
}

export async function getProductByIdService(pid) {
  console.log(pid);
  const getProductById = await manager.getProductById(pid);
  return getProductById;
}

export async function addProductService(product) {
  const newProduct = await manager.addProduct(product);
  return newProduct;
}

export async function updateProductService(id, product) {
  const updateProduct = await manager.updateProduct(id, product);
  return updateProduct;
}

export async function deleteProductService(id) {
  const deletedProduct = await manager.deleteProduct(id);
  return deletedProduct;
}

export async function getProductsByCategoryService(cat) {
  const findCategory = await manager.getProductsByCategory(cat);
  return findCategory;
}

export async function orderProductByPriceService(num) {
  const sort = await manager.orderProductByPrice(num);
  return sort;
}

export async function mockingProductsService() {
  const mocking = await manager.mockingProducts();
  return mocking;
}