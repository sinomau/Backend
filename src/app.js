import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import { authRouter } from "./routes/auth.router.js";
import __dirname from "./utils.js ";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import { options } from "./config/options.js";
import "./config/dbConnection.js";
import { initializePassport } from  "./config/passport.config.js";
import passport from "passport";


//connect server
const port = options.server.port;
const app = express();
const httpServer = app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

//passport
initializePassport();
app.use(passport.initialize());



//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../public"));
app.use(cookieParser());

//handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

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
