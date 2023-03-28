import FileProductManager from "./file-managers/product.manager.js";
import FileCartsManager from "./file-managers/carts.manager.js";
import DbProductManager from "./db-managers/product.manager.js";
import DbCartsManager from "./db-managers/carts.manager.js";

const config = {
  persistenceType: "db",
};

let productManager, cartsManager;

if (config.persistenceType === "file") {
  productManager = FileProductManager;
  cartsManager = FileCartsManager;
} else if (config.persistenceType === "db") {
  productManager = DbProductManager;
  cartsManager = DbCartsManager;
} else {
  throw new Error("Persistence type not exist");
}

export { productManager, cartsManager };
