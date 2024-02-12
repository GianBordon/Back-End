import { usersDao } from "../dao/factory.js"

export class UserService{

    static createUser = (userInfo) =>{
        return usersDao.createUser(userInfo);
    };

    static getUserById = (userId) =>{
        return usersDao.getUserById(userId);
    };

    static getUserByEmail = (email) =>{
        return usersDao.getUserByEmail(email);
    };

    static updateUser = (id, user)=>{
        return usersDao.updateUser(id, user);
    };

    static getAllUsers = () => {
        return usersDao.getAllUsers();
    };

    static deleteInactiveUsers = (inactiveSince) => {
        return usersDao.deleteInactiveUsers(inactiveSince);
    };
}