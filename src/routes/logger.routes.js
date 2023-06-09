import { Router } from "express";
import { addLogger } from "../utils/logger.js";

const router = Router();

router.use(addLogger)

router.get("/", (req, res) => {
  req.logger.fatal("Este es un mensaje fatal");
  req.logger.error("Este es un mensaje de error");
  req.logger.warn("Este es un mensaje de advertencia");
  req.logger.info("Este es un mensaje informativo");
  req.logger.http("Este es un mensaje de HTTP");
  req.logger.debug("Este es un mensaje de depuración");

  res.send("Logger test");
});

export { router as loggerRouter };