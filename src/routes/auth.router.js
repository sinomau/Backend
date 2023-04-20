import { Router } from "express";
import { userModel } from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";

const router = Router();

//signup por passport
router.post(
  "/signup",
  passport.authenticate("signupStrategy", {
    failureRedirect: "/api/sessions/failure-signup",
    successRedirect: "/",
  }),
);

//login por passport
router.post(
  "/login",
  passport.authenticate("loginStrategy", {
    failureRedirect: "/api/sessions/failure-login",
    successRedirect: "/products",
  })
);

//falla de registro
router.get("/failure-signup", (req, res) => {
  res.render("signup", { error: "Usuario ya existente" });
});

//falla de login
router.get("/failure-login", (req, res) => {
  res.render("login", { error: "Usuario o contraseña incorrectos" });
});

//reg por github
router.get("/github", passport.authenticate("githubSignup"));
//callback de github
router.get(
  "/github-callback",
  passport.authenticate("githubSignup", {
    failureRedirect: "/api/sessions/failure-signup",
    successRedirect: "/products",
  }),
);

// router.post("/signup", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await userModel.findOne({ email: email });
//     if (!user) {
//       const newUser = await userModel.create({
//         email,
//         password: createHash(password),
//       });
//       req.session.user = newUser.email;
//       req.session.isAdmin = false;
//       if (newUser.email.endsWith("@coder.com")) {
//         req.session.isAdmin = true;
//       }
//       res.redirect("/");
//     } else {
//       res.render("signup", {
//         error: "Usuario ya registrado,",
//       });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const getUser = await userModel.findOne({ email: email });

//     if (!getUser) {
//       res.render("login", { error: "Usuario o contraseña incorrectos" });
//     } else {
//       if (isValidPassword(getUser, password)) {
//         req.session.user = getUser.email;
//         if (getUser.email.endsWith("@coder.com")) {
//           req.session.role = "Admin";
//         } else {
//           req.session.role = "User";
//         }
//         res.redirect("/products");
//       } else {
//         res.render("login", { error: "Usuario o contraseña incorrectos" });
//       }
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

router.post("/logout", async (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.send("La sesion no pudo cerrase");
    res.redirect("/");
  });
});

export { router as authRouter };
