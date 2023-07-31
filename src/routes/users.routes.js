import { Router } from "express";
import { checkRole } from "../middlewares/auth.js";
import {
  updateUserRoleController,
  uploadDocumentsController,
  getUserController,
  deleteUserController,
  getUserByIdController,
  
} from "../controllers/users.controller.js";
import { documentUploader } from "../middlewares/multer.js";
import { checkAuth } from "../middlewares/auth.js";

const router = Router();

router.get("/",checkRole(["admin"]) , getUserController);

router.get("/:uid",checkRole(["admin"]) , getUserByIdController);

router.delete("/",checkRole(["admin"]) , deleteUserController);

router.put("/premium/:uid",checkRole(["admin"]) , updateUserRoleController);

router.put(
  "/:uid/documents",
  checkAuth,
  documentUploader.fields([
    { name: "identificacion", maxCount: 1 },
    { name: "domicilio", maxCount: 1 },
    { name: "estadoDeCuenta", maxCount: 1 },
  ]),
  uploadDocumentsController
);

export { router as usersRouter };
