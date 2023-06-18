import nodemailer from "nodemailer";
import { options } from "../config/options.js";

const adminEmail = options.gmail.emailAdmin;
const adminPassword = options.gmail.emailPass;

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

export const sendRecoveryPass = async (UserEmail,token) => {
  const link = `http://localhost:8080/reset-password?token=${token}`;

  await transporter.sendMail({
    from: options.gmail.emailAdmin,
    to: UserEmail ,
    subject: "Recuperación de contraseña",
    html: `
      <h1>Recuperación de contraseña</h1>
      <p>Para recuperar tu contraseña haz click en el siguiente enlace:</p>
      <a href="${link}">Restablecer constraseña</a>
    `,
  });
};

export { transporter };
