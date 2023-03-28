import __dirname from "../../utils.js";
import chatModel from "../models/chat.model.js";

export default class chatManager {
  constructor() {
    console.log("Messages from DbManager");
  }

  async createMessage(user, message) {
    const addMessage = await chatModel.create({ user, message });
    return addMessage;
  }

  async getMessages() {
    const messages = await chatModel.find().lean();

    return messages;
  }
}
