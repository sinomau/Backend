import { Router } from "express";
import { checkRole } from "../middlewares/auth.js";
import {
  updateUserRoleController,
  uploadDocumentsController,
} from "../controllers/users.controller.js";
import { documentUploader } from "../utils/multer.js";
import { checkAuth } from "../middlewares/auth.js";

const router = Router();

router.put("/premium/:uid", updateUserRoleController);

router.put("/:uid/documents",checkAuth, documentUploader.fields([{name:"identificacion",maxCount:1}, {name:"domicilio",maxCount:1},{name:"estadoDeCuenta",maxCount:1}]), uploadDocumentsController)


export { router as usersRouter };
