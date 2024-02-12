import { usersModel } from "./models/users.model.js";
import { logger } from "../../../helpers/logger.js";

export class UsersManagerMongo {
    constructor() {
        // Inicializa el modelo de usuarios
        this.model = usersModel;
    };

    // Método para crear un nuevo usuario
    async createUser(userInfo) {
        try {
            // Crea un nuevo usuario en la base de datos
            const result = await this.model.create(userInfo);
            return result;
        } catch (error) {
            // Captura y maneja cualquier error que ocurra durante la creación del usuario
            logger.error("createUser: ", error.message);
            throw new Error("Se produjo un error al crear el usuario");
        }
    };

    // Método para obtener un usuario por su ID
    async getUserById(userId) {
        try {
            // Busca un usuario por su ID en la base de datos
            const result = await this.model.findById(userId).lean();
            return result;
        } catch (error) {
            // Captura y maneja cualquier error que ocurra durante la búsqueda del usuario por ID
            logger.error("getUserById: ", error.message);
            throw new Error("Se produjo un error obteniendo el usuario por ID");
        }
    };

    // Método para obtener un usuario por su correo electrónico
    async getUserByEmail(userEmail) {
        try {
            // Busca un usuario por su correo electrónico en la base de datos
            const result = await this.model.findOne({ email: userEmail }).lean();
            return result;
        } catch (error) {
            // Captura y maneja cualquier error que ocurra durante la búsqueda del usuario por correo electrónico
            logger.error("getUserByEmail: ", error.message);
            throw new Error("Se produjo un error obteniendo el usuario por correo electrónico");
        }
    };

    // Método para actualizar un usuario
    async updateUser(id, user) {
        try {
            // Actualiza un usuario en la base de datos
            const result = await this.model.findByIdAndUpdate(id, user, { new: true });
            return result;
        } catch (error) {
            // Captura y maneja cualquier error que ocurra durante la actualización del usuario
            logger.error("updateUser: ", error.message);
            throw new Error("Se produjo un error actualizando el usuario");
        }
    };

    // Método para obtener todos los usuarios
    async getAllUsers() {
        try {
            // Obtiene todos los usuarios de la base de datos seleccionando solo algunos campos específicos
            const users = await this.model.find().select("full_name email role").lean();
            return users;
        } catch (error) {
            // Captura y maneja cualquier error que ocurra durante la obtención de todos los usuarios
            logger.error("getAllUsers: ", error.message);
            throw new Error("Se produjo un error obteniendo todos los usuarios");
        }
    }

    // Método para eliminar usuarios inactivos
    async deleteInactiveUsers(inactiveSince) {
        try {
            // Encuentra los usuarios inactivos en función de la última conexión
            const inactiveUsers = await this.model.find({ last_connection: { $lt: inactiveSince } });

            // Elimina los usuarios inactivos de la base de datos
            await this.model.deleteMany({ last_connection: { $lt: inactiveSince } });

            return inactiveUsers;
        } catch (error) {
            // Captura y maneja cualquier error que ocurra durante la eliminación de usuarios inactivos
            logger.error("deleteInactiveUsers: ", error.message);
            throw new Error("Se produjo un error eliminando usuarios inactivos");
        }
    }
}
