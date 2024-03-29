import passport from "passport";
import LocalStrategy from "passport-local";
import GithubStrategy from "passport-github2";
import { userModel } from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils/utils.js";
import cartsModel from "../dao/models/carts.model.js";
import { logger } from "../utils/logger.js";

const initializedPassport = () => {
  passport.use(
    "signupStrategy",
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });
          if (user) {
            logger.error("Usuario ya existe");
            return done(null, false, { message: "Usuario ya existe" });
          }
          const img = req.file ? req.file.path : "";

          const newUser = {
            email: username,
            first_name: req.body.first_name ? req.body.first_name : "NoName",
            last_name: req.body.last_name ? req.body.last_name : "NoLastName",
            password: createHash(password),
            role: "user",
            avatar: img,
          };

          if (username.endsWith("@coder.com")) {
            newUser.role = "admin";
          } else {
            newUser.role = "user";
          }

          const userCreated = await userModel.create(newUser);
          const cart = await cartsModel.create({ user: userCreated._id });
          userCreated.cart = cart;
          await userCreated.save();

          return done(null, userCreated);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //estrategia login passport

  passport.use(
    "loginStrategy",
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });
          if (!user) {
            logger.error("Usuario no encontrado");
            return done(null, false, { message: "Usuario no encontrado" });
          }
          if (!isValidPassword(user, password)) {
            logger.error("Password Incorrecta");
            return done(null, false, { message: "Password Incorrecta" });
          }
          user.last_connection = new Date();
          const userUpdated = await userModel.findByIdAndUpdate(user._id, user);
          logger.info("Usuario logueado correctamente");

          return done(null, userUpdated);
        } catch (error) {
          logger.error(error);
          return done(error);
        }
      }
    )
  );

  //Estrategia para autenticar a los usuarios a traves de github
  passport.use(
    "githubSignup",
    new GithubStrategy(
      {
        clientID: "Iv1.bb1793a6ad7f86a8",
        clientSecret: "32d7ac49afddde43958c7986d87e55fe76509d6d",
        callbackURL: "http://localhost:8080/api/sessions/github-callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const userExists = await userModel.findOne({
            email: profile.username,
          });
          if (userExists) {
            return done(null, userExists);
          }
          const newUser = {
            email: profile.username,
            first_name: profile.first_name ? profile.first_name : "NoName",
            last_name: profile.last_name ? profile.last_name : "NoLastName",
            password: createHash(profile.id),
            role: "user",
          };
          const userCreated = await userModel.create(newUser);

          const cart = await cartsModel.create({ user: userCreated._id });
          userCreated.cart = cart;
          await userCreated.save();

          return done(null, userCreated);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //serializar y deserializar usuarios
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    return done(null, user); //req.user = user
  });
};

export { initializedPassport };
