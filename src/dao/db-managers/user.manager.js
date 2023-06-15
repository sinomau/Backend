class UserManagerMongo {
  constructor(model) {
    this.model = model;
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
