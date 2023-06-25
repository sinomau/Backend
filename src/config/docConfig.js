import __dirname from "../utils/utils.js";
import swaggerJsDoc from "swagger-jsdoc";
import path from "path";

const PORT = process.env.PORT || 8080;

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
        title: "Backend-Proyect",
        version: "1.0.0",
        description: "Backend-Proyect API E-commerce",
    },
    servers: [{url : `http://localhost:${PORT}`}],
  },
    apis: [path.join(__dirname, "../docs/**/*.yaml")],
};

export const swaggerSpecs = swaggerJsDoc(swaggerOptions);