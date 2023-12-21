import { usersModel } from "./models/users.model.js";
import { logger } from "../../../helpers/logger.js";

export class UsersManagerMongo{
    constructor(){
        this.model=usersModel;
    };

    async createUser(userInfo){
        try {
            const result = await this.model.create(userInfo);
            return result;
        } catch (error) {
            return {status:"error", error:error}
        }
    };

    async getUserById(userId){
        try {
            const result = await this.model.findById(userId).lean();
            return result;
        } catch (error) {
            logger.error("getUserById: ", error.message);
            throw new Error("Se produjo un error obteniendo el usuario");
        }
    };

    async getUserByEmail(userEmail){
        try {
            const result = await this.model.findOne({email:userEmail}).lean();
            return result;
        } catch (error) {
            logger.error("getUserByEmail: ", error.message);
            throw new Error("Se produjo un error obteniendo el usuario");
        }
    };

    async updateUser(id,user){
        try {
            const result = await this.model.findByIdAndUpdate(id, user, {new:true});
            return result;
        } catch (error) {
            logger.error("updateUser: ", error.message);
            throw new Error("Se produjo un error actualizando el usuario");
        }
    };
}