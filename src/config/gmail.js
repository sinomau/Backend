import nodemailer from "nodemailer";
import { options } from "../config/options.js";

const adminEmail = options.gmail.user;
const adminPassword = options.gmail.pass;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: adminEmail,
    pass: adminPassword,
  },
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
});

export const recoveryPassword = (email, token) => {
  const link = `http://localhost:8080/forgot-password/${token}`;

  transporter.sendMail({
    from: adminEmail,
    to: email,
    subject: "Recuperación de contraseña",
    html: `
      <h1>Recuperación de contraseña</h1>
      <p>Para recuperar tu contraseña haz click en el siguiente enlace:</p>
      <a href="${link}">Recuperar constraseña</a>
    `,
  });
};

export { transporter };
