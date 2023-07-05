import mongoose from "mongoose";
import { options } from "./options.js";

export const dbConnection = async () => {
  try {
    if (options.server.environment === "development") {
      await mongoose.connect(options.mongoDB.urlDev);
      console.log("conexión a la base de datos de desarrollo exitosa");
    }
    if (options.server.environment === "production") {
      await mongoose.connect(options.mongoDB.url);
      console.log("conexión a la base de datos de produccion exitosa");
    }

  } catch (error) {
    console.log(`Hubo un error conectandose a la base ${error}`);
  }
};
