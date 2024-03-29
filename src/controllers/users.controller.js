import { updateUserRoleService } from "../service/users.service.js";
import { userModel } from "../dao/models/user.model.js";
import { deleteUserService } from "../service/users.service.js";
import { sendMailAfterDeleteUser } from "../config/gmail.js";
import cartsModel from "../dao/models/carts.model.js";


export const getUserController = async (req, res) => {
  try {
    const users = await userModel.find().lean();
    res.render("users", { users });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserByIdController = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await userModel.findById(uid);

    res.send({ status: "success", payload: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const deletedUsers = await deleteUserService();
    for (const user of deletedUsers) {
      await sendMailAfterDeleteUser(user.email);
    }

    res.json({
      status: "success",
      message: "Usuarios eliminados correctamente.",
      data: deletedUsers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const logOutController = async (req, res) => {
  const user = { ...req.user };
  req.session.destroy(async (err) => {
    if (err) {
      res.status(400).json({ message: err.message });
    }
    user.last_connection = new Date();
    const userUpdated = await userModel.findByIdAndUpdate(user._id, user);
    userUpdated.save();
    res.json({ status: 200, message: "Log out successfully" });
  });
};

export const updateUserRoleController = async (req, res, id) => {
  try {
    const { id } = req.body;
    console.log(id);
    const user = await userModel.findById(id);
    if (user.documents.length === 3) {
      user.status = "Completo";
      if (user.role === "user") {
        user.role = "admin";
      } else if (user.role === "admin") {
        user.role = "user";
      }
      const updateUserRole = await updateUserRoleService(user);
      updateUserRole.save();
      res.send("Rol actualizado");
    } else if (user.documents.length === 2) {
      res.send("No se puede actualizar el rol, faltan cargar documentos");
    } else {
      console.log(user.documents.length);
      res.send("No se puede actualizar el rol, faltan cargar documentos");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const uploadDocumentsController = async (req, res) => {
  try {
    console.log(req.files);
    const userId = req.params.uid;
    const user = await userModel.findById(userId);
    if (user) {
      const identificacion = req.files["identificacion"]?.[0] || null;
      const domicilio = req.files["domicilio"]?.[0] || null;
      const estadoDeCuenta = req.files["estadoDeCuenta"]?.[0] || null;
      const docs = [];
      if (identificacion) {
        docs.push({
          name: "identificacion",
          reference: identificacion.filename,
        });
      }
      if (domicilio) {
        docs.push({ name: "domicilio", reference: domicilio.filename });
      }
      if (estadoDeCuenta) {
        docs.push({
          name: "estadoDeCuenta",
          reference: estadoDeCuenta.filename,
        });
      }
      if (docs.length === 3) {
        user.status = "Completo";
      } else {
        user.status = "Incompleto";
      }
      user.documents = docs;
      const userUpdated = await userModel.findByIdAndUpdate(user._id, user);
      userUpdated.save();
      res.json({ status: "success", message: "Documentos cargados." });
    } else {
      res.json({
        status: "error",
        message: "No fue posible cargar los documentos.",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: "Error al cargar los documentos." });
  }
};

