import { Router } from "express";
import { userModel } from "../dao/models/user.model.js";

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      const newUser = await userModel.create({ email, password });
      req.session.user = newUser.email;
      req.session.isAdmin = false
            if (newUser.email.endsWith("@coder.com")) {
                req.session.isAdmin = true
            }
      res.redirect("/");
    } else {
      res.render("signup", {
        error: "Usuario ya registrado,",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const getUser = await userModel.findOne({ email: email });

    if (!getUser) {
      res.render("login", { error: "Usuario o contraseña incorrectos" });
    } else {
      if (getUser.password === password) {
        req.session.user = getUser.email;
        if (getUser.email.endsWith("@coder.com")) {
          req.session.role = "Admin";
        } else {
          req.session.role = "User";
        }
        res.redirect("/products");
      } else {
        res.render("login", { error: "Usuario o contraseña incorrectos" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});







router.post("/logout", async (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.send("La sesion no pudo cerrase");
    res.redirect("/");
  });
});

export { router as authRouter };
