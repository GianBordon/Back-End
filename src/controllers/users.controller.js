import { UserService } from "../services/users.service.js";
import { sendAccountDeletionEmail } from "../helpers/email.js";

export class UsersController {

    // Método para modificar el rol de un usuario
    static modifyRole = async(req,res)=>{
        try {
            const userId = req.params.uid;
            const user = await UserService.getUserById(userId);
            // Verificar si el usuario ha cargado todos los documentos
            if(user.status !== "completo"){
                return res.json({status:"error", message:"El usuario debe cargar todos los documentos"})
            }
            // Cambiar el rol del usuario según su rol actual
            if(user.role === "premium"){
                user.role = "user";
            } else if(user.role === "user"){
                user.role = "premium";
            } else {
                res.json({status:"error", message:"No se puede cambiar el rol del usuario"});
            }
            // Actualizar el usuario en la base de datos
            await UserService.updateUser(user._id, user);
            res.json({status:"success", message:"Rol de usuario modificado"}); 
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };

    // Método para subir los documentos de un usuario
    static uploadUserDocuments = async (req,res)=>{
        try {
            const userId = req.params.uid;
            const user = await UserService.getUserById(userId)
            const identificacion = req.files["identificacion"]?.[0] || null
            const domicilio = req.files["domicilio"]?.[0] || null
            const estadoDeCuenta = req.files["estadoDeCuenta"]?.[0] || null
            const docs =[];
            // Verificar y guardar los documentos en un array
            if(identificacion){
                docs.push({name:"identificacion", reference: identificacion.filename})
            }
            if(domicilio){
                docs.push({name:"domicilio", reference: identificacion.filename})
            }
            if(estadoDeCuenta){
                docs.push({name:"estadoDeCuenta", reference: identificacion.filename})
            }
            // Asignar los documentos al usuario y actualizar su estado
            user.documents = docs;
            if(docs.length<3){
                user.status = "incompleto";
            } else {
                user.status = "completo";
            }
            // Actualizar el usuario en la base de datos
            await UserService.updateUser(user._id, user);
            res.json({status:"success", message:"Documentos Actualizados"})
        } catch (error) {
            res.json({status:"error", message:error.message})
        }
    }

    // Método para obtener todos los usuarios
    static getAllUsers = async (req, res) => {
        try {
            const users = await UserService.getAllUsers();
            // Simplificar los usuarios para enviar solo información necesaria
            const simplifiedUsers = users.map(user => ({
                name: user.full_name,
                email: user.email,
                role: user.role
            }));
            res.json({ status: "success", users: simplifiedUsers });
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
        }
    };

    // Método para eliminar usuarios inactivos
    static deleteInactiveUsers = async (req, res) => {
        try {
            // Calcula el tiempo límite (hace 10 minutos)
            const tenMinutesAgo = new Date();
            tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);

            // Encuentra y elimina los usuarios inactivos
            const deletedUsers = await UserService.deleteInactiveUsers(tenMinutesAgo);

            // Envía un correo electrónico a cada usuario eliminado
            for (const user of deletedUsers) {
                await sendAccountDeletionEmail(user.email);
            }

            res.json({ status: "success", message: "Usuarios inactivos eliminados y notificados por correo electrónico" });
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
        }
    };
}
