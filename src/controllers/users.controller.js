import { UserService } from "../services/users.service.js";

export class UsersController{
    static modifyRole = async(req,res)=>{
        try {
            const userId = req.params.uid;
            const user = await UserService.getUserById(userId);
            if(user.status !== "completo"){
                return res.json({status:"error", message:"El usuario debe cargar todos los documentos"})
            }
            if(user.role === "premium"){
                user.role = "user";
            } else if(user.role === "user"){
                user.role = "premium";
            } else {
                res.json({status:"error", message:"No se puede cambiar el rol del usuario"});
            }
            await UserService.updateUser(user._id, user);
            res.json({status:"success", message:"rol de usuario modificado"});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };

    static uploadUserDocuments = async (req,res)=>{
        try {
            const userId = req.params.uid;
            const user = await UserService.getUserById(userId)
            const identificacion = req.files["identificacion"]?.[0] || null
            const domicilio = req.files["domicilio"]?.[0] || null
            const estadoDeCuenta = req.files["estadoDeCuenta"]?.[0] || null
            const docs =[];
            if(identificacion){
                docs.push({name:"identificacion", reference: identificacion.filename})
            }
            if(domicilio){
                docs.push({name:"domicilio", reference: identificacion.filename})
            }
            if(estadoDeCuenta){
                docs.push({name:"estadoDeCuenta", reference: identificacion.filename})
            }
            user.documents = docs;
            if(docs.length<3){
                user.status = "incompleto";
            } else {
                user.status = "completo";
            }
            await UserService.updateUser(user._id, user);
            res.json({status:"success", message:"Documentos Actualizados"})
        } catch (error) {
            res.json({status:"error", message:error.message})
        }
    }
}