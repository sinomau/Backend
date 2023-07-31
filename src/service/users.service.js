import { UserManagerMongo } from "../dao/db-managers/user.manager.js";
import { userModel } from "../dao/models/user.model.js";

const userManager = new UserManagerMongo(userModel);



export async function getUserService() {
  const users = await userManager.getUser();
  return users;
}


export async function deleteUserService() {
  const deletedUsers = await userManager.deleteUsersBasedOnLastConnection();
  return deletedUsers;
}

export async function updateUserRoleService(uid) {
  const roleUpdated = await userManager.updateUserRole(uid);
  return roleUpdated;
}

export async function getUserByEmailService(email) {
  const user = await userManager.getUserByEmail(email);
  return user;
}

export async function uploadDocumentsService(uid, files) {
  const userUpdated = await userManager.uploadDocuments(uid, files);
  return userUpdated;
}

export async function getUserByIdService(uid) {
  const user = await userManager.getUserById(uid);
  return user;
}