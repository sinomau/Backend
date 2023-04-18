import { Router } from "express";
import { userModel } from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";

const router = Router();

router.post(
  "/signup",
  passport.authenticate("signupStrategy", {
    failureRedirect: "/api/sessions/failure-signup",
  }),
  (req, res) => {
    res.send("usuario registrado");
  }
);
//falla de registro
router.get("/failure-signup", (req, res) => {
  res.send("falla en el registro");
});
//reg por github
router.get("/github", passport.authenticate("githubSignup"));
//callback de github
router.get(
  "/github-callback",
  passport.authenticate("githubSignup", {
    failureRedirect: "/api/sessions/failure-signup",
  }),
  (req, res) => {
    req.session.user = req.user.email;
    req.session.role = "User";
    res.redirect("/products");
  }
);

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      const newUser = await userModel.create({
        email,
        password: createHash(password),
      });
      req.session.user = newUser.email;
      req.session.isAdmin = false;
      if (newUser.email.endsWith("@coder.com")) {
        req.session.isAdmin = true;
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
      if (isValidPassword(getUser, password)) {
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
