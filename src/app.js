import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import __dirname from "./utils.js ";
import { engine } from "express-handlebars";
import { Server } from "socket.io";

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

app.use("/",(req,res,next)=>{
  req.io = socketServer;
  next()
})

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);