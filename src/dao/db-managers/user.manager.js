import  cartsManager  from "./carts.manager.js";

class UserManagerMongo {
  constructor(model) {
    this.model = model;
    this.cartsManager = new cartsManager();
  }

  async getUser() {
    try {
      const data = await this.model.find();
      const response = JSON.parse(JSON.stringify(data));
      return response;
    } catch (error) {
      throw new Error(`Error al obtener usuarios: ${error.message}`);
    }
  }

  async getUserById(uid) {
    try {
      const data = await this.model.findById(uid);
      const response = JSON.parse(JSON.stringify(data));
      return response;
    } catch (error) {
      throw new Error(`Error al obtener usuario: ${error.message}`);
    }
  }

  async deleteUsersBasedOnLastConnection() {
    try {
      const twoMinutes = 2 * 60 * 1000; // 2 minutos en milisegundos
      const allUsers = await this.model.find();
      const usersToDelete = allUsers.filter((user) => {
        const lastConnection = user.last_connection;
        if (lastConnection instanceof Date) {
          return Date.now() - lastConnection.getTime() >= twoMinutes;
        }
        return false;
      });
      await Promise.all(
        usersToDelete.map(async (user) => {
          const userCartId = user.cart;
          const idToString = userCartId.toString();
          await this.cartsManager.deleteAllProductsFromCart(idToString);
        })
      );
      await this.model.deleteMany({
        _id: { $in: usersToDelete.map((user) => user._id) },
      });

      return usersToDelete;
    } catch (error) {
      throw new Error(`Error al eliminar usuarios: ${error.message}`);
    }
  }

  async addUser(user) {
    try {
      const data = await this.model.create(user);
      const response = JSON.parse(JSON.stringify(data));
      return response;
    } catch (error) {
      throw new Error(`Error al guardar: ${error.message}`);
    }
  }

  async getUserByEmail(email) {
    try {
      const data = await this.model.findOne({ email: email });
      const response = JSON.parse(JSON.stringify(data));
      return response;
    } catch (error) {
      throw new Error(`Error al obtener usuario: ${error.message}`);
    }
  }

  async updateUserPassword(email, password) {
    try {
      const data = await this.model.findOneAndUpdate(
        { email: email },
        { password: password }
      );
      const response = JSON.parse(JSON.stringify(data));
      return response;
    } catch (error) {
      throw new Error(`Error al actualizar usuario: ${error.message}`);
    }
  }

  async updateUserRole(userId) {
    try {
      const user = await this.model.findById(userId);
      if (!user) throw new Error(`User not found`);
      if (user.role === "user") {
        user.role = "premium";
        const updatedUser = await user.save();
        return updatedUser;
      } else if (user.role === "premium") {
        user.role = "user";
        const updatedUser = await user.save();
        return updatedUser;
      }
    } catch (error) {
      throw new Error(`Error updating user role: ${error}`);
    }
  }
}

export { UserManagerMongo };
