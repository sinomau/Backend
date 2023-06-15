import { Router } from "express";
import { checkRole } from "../middlewares/auth.js";
import { updateUserRoleController } from "../controllers/users.controller.js";

const router = Router();

router.put("/premium/:uid", checkRole(["admin"]), updateUserRoleController);

export { router as usersRouter };
