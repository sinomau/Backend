import chai from "chai";
import supertest from "supertest";
import { app } from "../src/app.js";
import { before, after } from "mocha";
import { userModel } from "../src/dao/models/user.model.js";
import productModel from "../src/dao/models/products.model.js";
import cartsModel from "../src/dao/models/carts.model.js";

const expect = chai.expect;
const requester = supertest(app);

let authToken = "";

describe("POST register", () => {
  it("should return a 200 status with a valid user", async () => {
    const mockUser = {
      email: "testing@coder.com",
      password: "1234",
    };
    const response = await requester
      .post("/api/sessions/signup")
      .send(mockUser);
    expect(response.status).to.eql(302);
  });
});

describe("Integration tests", () => {
  const mockUser = {
    email: "testing@coder.com",
    password: "1234",
  };

  before(async () => {
    const response = await requester.post("/api/sessions/login").send(mockUser);
    expect(response.status).to.eql(302);

    const cookie = response.headers["set-cookie"][0];
    authToken = cookie.split(";")[0];

    console.log(authToken);
  });

  describe("GET products", () => {
    it("should return a list of products", async () => {
      const response = await requester
        .get("/api/products")
        .set("Cookie", authToken);
      expect(response.status).to.eql(200);
      expect(response.body.payload).to.be.an("array");
    });
  });

  describe("POST products", () => {
    it("should return a 201 status with a valid product", async () => {
      const mockProduct = {
        code: "12345",
        title: "test",
        description: "test",
        price: 1234,
        thumbnail: "test",
        stock: 1234,
        category: "test",
      };

      const response = await requester
        .post("/api/products")
        .send(mockProduct)
        .set("Cookie", authToken);
        expect(response.status).to.eql(200);
      });
  });

  describe("GET products/:id", () => {
    it("should return a 200 status with a valid product", async () => {
      const idMock = "64a771811b81168d81802ba5";
      const response = await requester
        .get(`/api/products/${idMock}`)
        .set("Cookie", authToken);
      expect(response.status).to.eql(200);
    });
  });

  describe("GET carts", () => {
    it("should return a 200 status with a valid cart", async () => {
      const response = await requester
        .get("/api/carts")
        .set("Cookie", authToken);
      expect(response.status).to.eql(200);
    });
  });

  after(async () => {
    await userModel.deleteMany();
    await productModel.deleteMany();
    await cartsModel.deleteMany();
  });
});
