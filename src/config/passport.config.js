import passport from "passport";
import jwt from "passport-jwt";
import { options } from "../config/options.js";

const { Strategy: JwtStrategy, ExtractJwt } = jwt;

const initializePassport = () => {
  passport.use(
    "authJWT",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: options.server.secretToken,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch {
          return done(error);
        }
      }
    )
  );
};

export const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[options.server.cookieToken];
  }
  return token;
};

export { initializePassport };

//   passport.use(
//     "signupStrategy",
//     new LocalStrategy(
//       {
//         usernameField: "email",
//         passreqToCallback: true,
//       },
//       async (username, password, done) => {
//         try {
//           const user = await userModel.findOne({ email: username });
//           if (user) {
//             return done(null, false, { message: "Usuario ya existe" });
//           }
//           const newUser = {
//             email: username,
//             password: createHash(password),
//             role: "User",
//           };

//           if (username.endsWith("@coder.com")) {
//             newUser.role = "Admin";
//           } else {
//             newUser.role = "User";
//           }

//           const userCreated = await userModel.create(newUser);
//           return done(null, userCreated);
//         } catch (error) {
//           return done(error);
//         }
//       }
//     )
//   );

//   //estrategia login passport

//   passport.use(
//     "loginStrategy",
//     new LocalStrategy(
//       {
//         usernameField: "email",
//         passreqToCallback: true,
//       },
//       async (username, password, done) => {
//         try {
//           const user = await userModel.findOne({ email: username });
//           if (!user) {
//             return done(null, false, { message: "Usuario no encontrado" });
//           }
//           if (!isValidPassword(user, password)) {
//             return done(null, false, { message: "Password Incorrecta" });
//           }
//           return done(null, user);
//         } catch (error) {
//           return done(error);
//         }
//       }
//     )
//   );

//   //Estrategia para autenticar a los usuarios a traves de github
//   passport.use(
//     "githubSignup",
//     new GithubStrategy(
//       {
//         clientID: "Iv1.bb1793a6ad7f86a8",
//         clientSecret: "32d7ac49afddde43958c7986d87e55fe76509d6d",
//         callbackURL: "http://localhost:8080/api/sessions/github-callback",
//       },
//       async (accessToken, refreshToken, profile, done) => {
//         try {
//           const userExists = await userModel.findOne({
//             email: profile.username,
//           });
//           if (userExists) {
//             return done(null, userExists);
//           }
//           const newUser = {
//             email: profile.username,
//             password: createHash(profile.id),
//             role: "User",
//           };
//           const userCreated = await userModel.create(newUser);

//           return done(null, userCreated);
//         } catch (error) {
//           return done(error);
//         }
//       }
//     )
//   );

//   //serializar y deserializar usuarios
//   passport.serializeUser((user, done) => {
//     done(null, user._id);
//   });

//   passport.deserializeUser(async (id, done) => {
//     const user = await userModel.findById(id);
//     return done(null, user); //req.user = user
//   });
