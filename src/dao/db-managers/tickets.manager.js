import { ticketsModel } from "../models/ticket.models.js";

class ticketsManager {
  constructor() {
    console.log("Working with Tickets DB system");
  }

  async createTicket(ticket) {
    console.log(ticket);
    try {
      const addTicket = await ticketsModel.create(ticket);
      return addTicket;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getTickets() {
    try {
      const tickets = await ticketsModel
        .find()
        .lean()
        .populate("products.product");
      return tickets;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}

export default ticketsManager;
