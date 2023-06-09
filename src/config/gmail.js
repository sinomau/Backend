import nodemailer from "nodemailer";
import { options } from "../config/options.js";

const adminEmail = options.gmail.user;
const adminPassword = options.gmail.pass;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: adminEmail,
    pass: adminPassword,
  },
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
});

export {transporter} 
