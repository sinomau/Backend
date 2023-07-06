import supertest from "supertest";
import chai from "chai";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Test products", () => {
  describe("Obtener todos los productos", () => {
    it("El endpoint GET /api/products debe devolver todos los productos", async () => {
      const result = await requester.get("/api/products");
      expect(result).to.be.ok;
    });
  });
  describe("Post de un producto", () => {
    it("El endpoint POST /api/products debe crear un producto", async () => {
      const productMock = {
        name: "Producto de prueba",
        description: "Descripcion de prueba",
        price: 1000,
        stock: 10,
        image: "https://via.placeholder.com/150",
        category: "test",
      };
      const result = await requester.post("/api/products").send(productMock);
      expect(result).to.be.ok;
    });
  });
  describe("Obtener un producto", () => {
    it("El endpoint GET /api/products/:id debe devolver un producto", async () => {
      const result = await requester.get("/api/products/1");
      expect(result).to.be.ok;
    });
  });
  describe("Actualizar un producto", () => {
    it("El endpoint PUT /api/products/:id debe actualizar un producto", async () => {
      const productMock = {
        name: "Producto de prueba",
        description: "Descripcion de prueba",
        price: 1000,
        stock: 10,
        image: "https://via.placeholder.com/150",
        category: "test",
      };
      const result = await requester.put("/api/products/1").send(productMock);
      expect(result).to.be.ok;
    });
  });
  describe("Eliminar un producto", () => {
    it("El endpoint DELETE /api/products/:id debe eliminar un producto", async () => {
      const result = await requester.delete("/api/products/1");
      expect(result).to.be.ok;
    });
  });
  describe("Obtener productos por categoria", () => {
    it("El endpoint GET /api/products/category/:category debe devolver productos por categoria", async () => {
      const result = await requester.get("/api/products/category/test");
      expect(result).to.be.ok;
    });
  });

});
