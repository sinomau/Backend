import { UserManagerMongo } from "../dao/db-managers/user.manager.js";
import { userModel } from "../dao/models/user.model.js";
import passport from "passport";
import { recoveryPassword } from "../config/gmail.js";
import { generateEmailToken } from "../utils/utils.js";
import { verifyEmailToken } from "../utils/utils.js";
import { isValidPassword } from "../utils/utils.js";

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

export const getProfileController = async (req, res) => {
  res.render("profile");
};

export const forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  const user = await manager.getUserByEmail(email);
  if (!user) return res.send("Usuario no encontrado");
  const token = manager.generateEmailToken(email, 3 * 60);
  await recoveryPassword(email, token);
  res.send("Correo enviado revise su casilla, para restaurar su contraseña");
};

export const resetPasswordController = async (req, res) => {
  const token = req.query.token;
  const { email, password } = req.body;
  const emailToken = verifyEmailToken(token);
  if (!emailToken) return res.send("Token invalido o expirado");
  const user = await manager.getUserByEmail(email);
  if (!user) return res.send("Usuario no encontrado");
  if (isValidPassword(newPassword, user))
    return res.send("La contraseña no puede ser igual a la anterior");
  const newPassword = manager.createHash(password);
  await manager.updateUserPassword(email, newPassword);

  res.send("Contraseña actualizada");
};
