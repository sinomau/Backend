import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import { authRouter } from "./routes/auth.router.js";
import __dirname from "./utils.js ";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import mongoose from "mongoose";
import session from "express-session";
import mongoStore from "connect-mongo";

//mongoDb connection
mongoose
  .connect(
    "mongodb+srv://sinopolimauro:Mipassword123@codercluster.vvb9tqq.mongodb.net/ecommerce?retryWrites=true&w=majority"
  )
  .then((connect) => {
    console.log("Conectado a MongoDB");
  });

//middlewares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../public"));

//session connection
app.use(
  session({
    store: mongoStore.create({
      mongoUrl:
        "mongodb+srv://sinopolimauro:Mipassword123@codercluster.vvb9tqq.mongodb.net/ecommerce?retryWrites=true&w=majority",
    }),
    secret: "claveSecreta",
    resave: true,
    saveUninitialized: true,
  })
);

//handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

//fs connect
const httpServer = app.listen(8080, () => {
  console.log("server listening on");
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("client connected");
});

//socketIo
app.use("/", (req, res, next) => {
  req.io = socketServer;
  next();
});

//routes
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", authRouter);
