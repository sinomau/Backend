import { Router } from "express";
import { UserManagerMongo } from "../dao/db-managers/user.manager.js";
import { UserModel } from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import jwt from "jsonwebtoken";
import { options } from "../config/options.js";

const router = Router();
const userManager = new UserManagerMongo();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userManager.getUserByEmail(email);
    if (user) {
      if (isValidPassword(password, user)) {
        const token = jwt.sign(
          { first_name: user.first_name, email: user.email, role: user.role },
          options.server.secretToken,
          { expiresIn: "24h" }
        );
        res
          .cookie(options.server.cookieToken, token, { httpOnly: true })
          .redirect("/products");
        return; // Evita enviar otra respuesta HTTP
      } else {
        res.render("login", { error: "Usuario o contraseña incorrectos" });
        return; // Evita ejecutar el siguiente código
      }
    } else {
      res.render("login", { error: "Usuario no registrado, registrarse " });
      return; // Evita ejecutar el siguiente código
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al loguearse" });
    return; // Evita ejecutar el siguiente código
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const user = await userManager.getUserByEmail(email);
    if (!user) {
      let role = "user";
      if (email.endsWith("@coder.com")) {
        role = "admin";
      }
      const newUser = {
        first_name,
        last_name,
        email,
        password: createHash(password),
        role,
      };
      const userCreated = await userManager.addUser(newUser);
      const token = jwt.sign(
        {
          first_name: userCreated.first_name,
          email: userCreated.email,
          role: userCreated.role,
        },
        options.server.secretToken,
        { expiresIn: "24h" }
      );
      res
        .cookie(options.server.cookieToken, token, { httpOnly: true })
        .redirect("/products");
      return; // Evita ejecutar el siguiente código
    } else {
      res.render("signup", { error: "Usuario ya registrado" });
      return; // Evita ejecutar el siguiente código
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    return; // Evita ejecutar el siguiente código
  }
});

router.post("/logout", (req, res) => {
  req.logout(() => {
    res.clearCookie(options.server.cookieToken).redirect("/");
  });
});

export { router as authRouter };
