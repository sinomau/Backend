import { UserManagerMongo } from "../dao/db-managers/user.manager.js";
import { userModel } from "../dao/models/user.model.js";
import passport from "passport";
import { sendRecoveryPass } from "../config/gmail.js";
import {
  verifyEmailToken,
  isValidPassword,
  generateEmailToken,
  createHash,
} from "../utils/utils.js";

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
  if (!user) {
    return res.send(`Usuario no encontrado`);
  }
  const token = generateEmailToken(email, 3 * 60);

  await sendRecoveryPass(email, token);
  res.send("Correo enviado revise su casilla, para restaurar su contraseña");
};

export const resetPasswordController = async (req, res) => {
  const token = req.query.token;
  const { email, loginPassword } = req.body;
  const emailToken = verifyEmailToken(token);
  

  if (!emailToken)
    return res.send(
      `El enlace ya no es valido, para generar nuevamente <a href="/forgot-password">Recuperar Password</a>`
    );

  const user = await userModel.findOne({ email: email });
  if (!user) return res.send("Usuario no encontrado");

  if (isValidPassword(user,loginPassword)){
    return res.send("No puedes utilizar la misma contraseña");
  }

  const userData = {
    ...user._doc,
    password: createHash(loginPassword),
  };

  const userUpdate = await userModel.findByIdAndUpdate(user._id, userData);

  res.render("login", { message: "contraseña actualizada" });
};
