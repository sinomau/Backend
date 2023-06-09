import { ticketsModel } from "../models/ticket.models.js";
import { logger } from "../../utils/logger.js";

class ticketsManager {
  constructor() {
    console.log("Working with Tickets DB system");
  }

  async createTicket(ticket) {
    try {
      const addTicket = await ticketsModel.create(ticket);
      return addTicket;
    } catch (err) {
      logger.error(err);
    }
  }

  async getTickets() {
    try {
      const tickets = await ticketsModel
        .find()
        .lean()
        .populate("products.product");
      return tickets;
    } catch (err) {
      logger.error(err);
      return [];
    }
  }
}

export default ticketsManager;
