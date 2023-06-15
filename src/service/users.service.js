import { UserManagerMongo } from "../dao/db-managers/user.manager.js";
import {userModel}  from "../dao/models/user.model.js";

const userManager = new UserManagerMongo(userModel);


export async function updateUserRoleService(uid) {
  const roleUpdated = await userManager.updateUserRole(uid);
  return roleUpdated;
}
