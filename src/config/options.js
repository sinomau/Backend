import dotenv from "dotenv";
import __dirname from "../utils/utils.js";

dotenv.config();

export const options = {
  FileSystem: {
    usersFileName: "users.json",
    productsFileName: "products.json",
  },
  mongoDB: {
    url: process.env.MONGO_URL,
  },
  server: {
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    secretSession: process.env.SECRET_SESSION,
  },
  gmail: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
    emailToken: process.env.EMAIL_TOKEN,
  },
};
