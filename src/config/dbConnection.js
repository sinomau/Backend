import mongoose from "mongoose";
import { options } from "./options.js";

try {
    await mongoose.connect(options.mongoDB.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Conectado a MongoDB");
} catch (error) {
    console.log(error);
}
