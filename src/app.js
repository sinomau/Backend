import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import __dirname from "./utils.js ";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://sinopolimauro:Mipassword123@codercluster.vvb9tqq.mongodb.net/ecommerce?retryWrites=true&w=majority"
  )
  .then((connect) => {
    console.log("Conectado a MongoDB");
  });

const app = express();

app.use(express.json());

app.use(express.static(__dirname + "/../public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

const httpServer = app.listen(8080, () => {
  console.log("server listening on");
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("client connected");
});

app.use("/", (req, res, next) => {
  req.io = socketServer;
  next();
});

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
