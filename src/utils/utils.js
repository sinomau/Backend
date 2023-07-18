import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { options } from "../config/options.js";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

export const isValidPassword = (user, loginPassword) => {
  return bcrypt.compareSync(loginPassword, user.password);
};

export const generateEmailToken = (email, expireTime) => {
  const token = jwt.sign({ email }, options.gmail.emailToken, {
    expiresIn: expireTime,
  });

  return token;
};

export const verifyEmailToken = (token) => {
  try {
    const info = jwt.verify(token, options.gmail.emailToken);
    return info.email;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export default __dirname;
