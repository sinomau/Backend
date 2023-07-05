import { expect } from "chai";
import supertest from "supertest";
import app from "../src/app.js";


const request = supertest(app);

describe("Test de las rutas de productos", () => {
  beforeEach(async function () {
    // Aquí puedes reiniciar la base de datos de productos si es necesario
  });

  it("Debe devolver todos los productos", async function () {
    const response = await requester.get("/products");
    expect(response.statusCode).to.be.equal(200);
    // Aquí puedes agregar más expectativas según los datos que esperas recibir
  });

  it("Debe devolver un producto específico según su ID", async function () {
    const productId = "exampleProductId"; // Reemplaza con el ID válido de un producto existente
    const response = await requester.get(`/products/${productId}`);
    expect(response.statusCode).to.be.equal(200);
    // Aquí puedes agregar más expectativas según los datos que esperas recibir
  });

  it("Debe agregar un nuevo producto", async function () {
    const productData = {
      // Aquí puedes proporcionar los datos del producto a agregar
    };
    const response = await requester.post("/products").send(productData);
    expect(response.statusCode).to.be.equal(200);
    // Aquí puedes agregar más expectativas según la respuesta esperada
  });

  it("Debe actualizar un producto existente", async function () {
    const productId = "exampleProductId"; // Reemplaza con el ID válido de un producto existente
    const updatedProductData = {
      // Aquí puedes proporcionar los datos actualizados del producto
    };
    const response = await requester
      .put(`/products/${productId}`)
      .send(updatedProductData);
    expect(response.statusCode).to.be.equal(200);
    // Aquí puedes agregar más expectativas según la respuesta esperada
  });

  it("Debe eliminar un producto existente", async function () {
    const productId = "exampleProductId"; // Reemplaza con el ID válido de un producto existente
    const response = await requester.delete(`/products/${productId}`);
    expect(response.statusCode).to.be.equal(200);
    // Aquí puedes agregar más expectativas según la respuesta esperada
  });
});
