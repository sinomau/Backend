import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const MONGO_DB_USER = process.env.MONGO_DB_USER;
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
const SECRET_TOKEN = process.env.SECRET_TOKEN;
const COOKIE_TOKEN = process.env.COOKIE_TOKEN;

export const options = {
  fileSystem: {
    userFileNeme: "users.json",
    productFileName: "products.json",
  },
  mongoDB: {
    url: `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@codercluster.vvb9tqq.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`,
  },
  server: {
    port: PORT,
    secretToken: SECRET_TOKEN,
    cookieToken: COOKIE_TOKEN,
  },
};
