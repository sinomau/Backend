import { UserModel } from "../models/user.model.js";

class UserManagerMongo{
    constructor(){
    };

    async addUser(user){
        try {
            const data = await UserModel.create(user);
            const response = JSON.parse(JSON.stringify(data));
            return response;
        } catch (error) {
            throw new Error(`Error al guardar: ${error.message}`);
        }
    };

    async getUserByEmail(email){
        try {
            const data = await UserModel.findOne({email:email});
            const response = JSON.parse(JSON.stringify(data));
            return response;
        } catch (error) {
            throw new Error(`Error al obtener usuario: ${error.message}`);
        }
    };
}

export {UserManagerMongo};