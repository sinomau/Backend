import { UserManagerMongo } from "../dao/db-managers/user.manager.js";
import { userModel } from "../dao/models/user.model.js";
import passport from "passport";

const manager = new UserManagerMongo(userModel);

export const passportSignupController = passport.authenticate(
  "signupStrategy",
  {
    failureRedirect: "/api/sessions/failure-signup",
  }
);

export const signUpRedirectController = (req, res) => {
  res.redirect("/");
};

export const passportLoginController = passport.authenticate("loginStrategy", {
  failureRedirect: "/api/sessions/failure-login",
});

export const loginRedirectController = (req, res) => {
  res.redirect("/products");
};

export const failureSignupController = (req, res) => {
  res.render("signup", { error: "Usuario ya existente" });
};

export const failureLoginController = (req, res) => {
  res.render("login", { error: "Usuario o contraseña incorrectos" });
};

export const githubPassportController = passport.authenticate("githubSignup");

export const loginGithubCallbackController = passport.authenticate(
  "githubSignup",
  {
    failureRedirect: "/api/sessions/failure-signup",
  }
);

export const githubRedirectController = (req, res) => {
  res.redirect("/products");
};

export const logoutController = (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.send("La sesion no pudo cerrase");
    res.redirect("/");
  });
};

