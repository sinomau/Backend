import { updateUserRoleService } from "../service/users.service.js";

export const updateUserRoleController = async (req, res) => {
  try {
    const { uid } = req.params;
    const roleUpdated = await updateUserRoleService(uid);
    res.status(200).json(roleUpdated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};