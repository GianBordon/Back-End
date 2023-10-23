import { usersModel } from "./models/users.model.js";

export class UsersManagerMongo {
    constructor() {
        this.model = usersModel;
    } 

    // Método para crear un usuario
    async createUser(userData) {
        try {
            const result = await this.model.create(userData);
            return result;
        } catch (error) {
            console.log("createUser: ", error.message);
            throw new Error("Se produjo un error al crear el usuario");
        }
    }

    // Método para obtener un usuario por su email
    async getUserByEmail(email) {
        try {
            const user = await this.model.findOne({ email });
            return user;
        } catch (error) {
            console.log('getUserByEmail: ', error.message);
            throw new Error('Se produjo un error al obtener el usuario por email');
        }
    }

    // Metodo para obtener un usuario por su ID
    async findUserById(id) {
        try {
            // Aquí, implementa la lógica para buscar un usuario por su ID en la base de datos
            const user = await this.model.findById(id);
            return user;
        } catch (error) {
            console.error('findUserById:', error.message);
            throw new Error('Error al buscar el usuario por ID');
        }
    }
};