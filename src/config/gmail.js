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

export const sendMailAfterDeleteUser = async (UserEmail) => {
  await transporter.sendMail({
    from: options.gmail.emailAdmin,
    to: UserEmail,
    subject: "Tu Cuenta Sera Eliminada por Inactividad",
    html: `
      <h1>Cuenta eliminada</h1>
      <p>Tu cuenta ha sido eliminada correctamente.</p>
    `,
  });
}

export const sendMailBeforeDeleteProduct = async (UserEmail, productName) => {
  await transporter.sendMail({
    from: options.gmail.emailAdmin,
    to: UserEmail,
    subject: "Tu producto fue eliminado ",
    html: `
      <h1>Producto eliminado</h1>
      <p>Tu producto ${productName} ha sido eliminado correctamente.</p>
    `,
  });
};


export { transporter };
