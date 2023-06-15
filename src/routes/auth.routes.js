import { Router } from "express";
import {
  passportSignupController,
  signUpRedirectController,
  passportLoginController,
  loginRedirectController,
  failureSignupController,
  failureLoginController,
  githubPassportController,
  loginGithubCallbackController,
  githubRedirectController,
  logoutController,
  getProfileController,
  forgotPasswordController,
  resetPasswordController,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", passportSignupController, signUpRedirectController);

router.post("/login", passportLoginController, loginRedirectController);

router.get("/failure-signup", failureSignupController);

router.get("/failure-login", failureLoginController);

router.get("/github", githubPassportController,);

router.get("/github-callback",loginGithubCallbackController,githubRedirectController ),

router.post("/logout", logoutController);

router.get("/profile", getProfileController);

router.post("/forgot-password", forgotPasswordController);

router.post("/reset-password", resetPasswordController);



export { router as authRouter };
