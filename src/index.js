import express from "express";
import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/cart.routes.js";
import viewsRouter from "./routes/views.routes.js";
import { authRouter } from "./routes/auth.routes.js";
import __dirname from "./utils/utils.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import session from "express-session";
import mongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import passport from "passport";
import { initializedPassport } from "./config/passport.config.js";
import { dbConnection } from "./config/dbConnection.js";
import { options } from "./config/options.js";
import { ChatManagerMongo } from "./dao/db-managers/chat.manager.js";
import { ChatModel } from "./dao/models/chat.model.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { addLogger, logger } from "./utils/logger.js";
import path from "path";
import { loggerRouter } from "./routes/logger.routes.js";
import { usersRouter } from "./routes/users.routes.js";
import { swaggerSpecs } from "./config/docConfig.js";
import swaggerUi from "swagger-ui-express";

dbConnection();

//middlewares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(errorHandler);
app.use(addLogger);
app.use("/loggerTest", loggerRouter);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs, swaggerUi));

//session connection
app.use(
  session({
    store: mongoStore.create({
      mongoUrl: options.mongoDB.url,
    }),
    secret: options.server.secretSession,
    resave: true,
    saveUninitialized: true,
  })
);

//passport
initializedPassport();
app.use(passport.initialize());
app.use(passport.session());

//handlebars
app.engine(
  "handlebars",
  engine({
    runtimeOptions: {
      allowProtoPropertiesInData: true,
    },
  })
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "../views"));
//fs connect
export const port = options.server.port;

const httpServer = app.listen(port, () =>
  console.log(`Server listening on port ${port}`)
);

logger.info(`Server listening on port ${port}`);

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("client connected");
});

//socketIo
app.use("/", (req, res, next) => {
  req.io = socketServer;
  next();
});

//cookieParser
app.use(cookieParser());

//routes
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", authRouter);
app.use("/api/users/", usersRouter);
app.use('/multer/users/img', express.static('./src/multer/users/img'));

//chat
const chatManager = new ChatManagerMongo(ChatModel);

socketServer.on("connection", async (socketConnected) => {
  console.log(`Nuevo cliente conectado ${socketConnected.id}`);
  const messages = await chatManager.getMessages();
  socketServer.emit("msgHistory", messages);
  //capturamos un evento del socket del cliente
  socketConnected.on("message", async (data) => {
    //recibimos el msg del cliente y lo guardamos en el servidor con el id del socket.
    await chatManager.addMessage(data);
    const messages = await chatManager.getMessages();
    // messages.push({socketId: socketConnected.id, message: data});
    //Enviamos todos los mensajes a todos los clientes
    socketServer.emit("msgHistory", messages);
  });
});

export { app };
