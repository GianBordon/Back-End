import { usersDao } from "../dao/factory.js"

export class UserService{

    static createUser = (userInfo) =>{
        return usersDao.createUser(userInfo);
    };

    static getUserById = (userId) =>{
        return usersDao.getUserById(userId);
    };

    static getUserByEmail = (userEmail) =>{
        return usersDao.getUserByEmail(userEmail);
    };

}