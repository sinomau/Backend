import { Router, json } from "express";
import chatManager from "../dao/db-managers/chat.manager.js";

const manager = new chatManager();

const chatRouter = Router();

chatRouter.use(json());

chatRouter.get("/", async (req, res) => {
  const messages = await manager.getMessages();
  res.render("chat", { messages });
  
});

chatRouter.post("/", async (req, res) => {
  const { user, message } = req.body;
  await manager.createMessage(user, message);
  req.io.emit("new-message", req.body);
  res.render("chat", { messages: await manager.getMessages() });
  
});

export default chatRouter;
