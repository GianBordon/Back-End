import { UserService } from "../services/users.service.js";
import { logger } from "../helpers/logger.js";
import { generateEmailToken, sendChangePasswordEmail, verifyEmailToken } from "../helpers/email.js"
import { createHash, inValidPassword } from "../utils.js";
import { CartService } from "../services/carts.service.js";

export class SessionsController {

    // Método para registrar un nuevo usuario
    static signUp = async (req, res) => {
        try {
            const avatarFile = req.file;
            let avatarFileName = "";
            if (avatarFile) {
                avatarFileName = avatarFile.filename;
            }
            res.render("loginView", { message: "Usuario registrado exitosamente" });
        } catch (error) {
            // Manejar el error
            console.log('Datos de la solicitud:', req.body); 
            console.log('Archivo recibido:', req.file); // Cambiado de req.files a req.file
            logger.error("Error en signUp:", error.message);
            res.render("signupView", { error: "Ocurrió un error al registrar el usuario" });
        }
    };

    // Método para renderizar la vista de fallo en el registro de usuario
    static failSignUp = (req,res)=>{
        res.render('signupView', { error: 'No se pudo registrar el usuario' });
    };

    // Método para iniciar sesión
    static login = async (req, res) => {
        // Verificar si la solicitud acepta JSON
        const acceptsJSON = req.accepts('json');

        if (acceptsJSON) {
            // Si acepta JSON, devolver una respuesta JSON
            res.json({ error: 'No se pudo iniciar sesión para el usuario' });
        } else {
            // Si no acepta JSON, redirigir a la vista
            res.redirect("/");
        }

        // Verificar si el usuario tiene un carrito asociado
    if (req.user && !req.user.cart) {
        try {
            // Crear un nuevo carrito y asociarlo con el usuario
            const newCart = await CartService.createCart();
            req.user.cart = newCart._id;
            await UserService.updateUser(req.user._id, req.user);
        } catch (error) {
            // Manejar cualquier error que ocurra al crear el carrito
            logger.error("Error al crear el carrito para el usuario:", error.message);
        }
    }
    };

    // Método para renderizar la vista de fallo en inicio de sesión
    static failLogin = (req,res)=>{
        res.render('loginView', { error: 'No se pudo iniciar sesión para el usuario' });
    };

    // Método para manejar el fallo en inicio de sesión con GitHub
    static failSignUpGitHub = (req,res)=>{
        res.redirect("/");
    };

    // Método para cerrar sesión
    static logOut = async(req,res)=>{
        try {
            const user = {...req.user};
            user.last_connection = new Date();
            await UserService.updateUser(user._id, user);
            req.session.destroy(err=>{
                if(err) return res.render("profileView",{error:"No se pudo cerrar la sesión"});
                res.redirect("/");
            })
        } catch (error) {
            res.render("signupView",{error:"No se pudo registrar el usuario"});
        }
    };

    // Método para manejar la solicitud de cambio de contraseña
    static forgotPassword = async(req,res)=>{ 
        const{email} = req.body;
        logger.informativo(email);
        try {
            const user = await UserService.getUserByEmail(email);
            const emailToken = generateEmailToken(email, 10 * 60);
            await sendChangePasswordEmail(req,email,emailToken);
            res.redirect("/loginView");
        } catch (error) {
            logger.error({status:"error", message:error.message})
        }
    }

    // Método para restablecer la contraseña
    static resetPassword = async(req,res)=>{
        try {
            const token = req.query.token;
            const {newPassword} = req.body;
            const validEmail = verifyEmailToken(token)
            if(!validEmail){
                return res.send(`El enlace ya no es válido, genera un nuevo <a href="/forgot-password">enlace</a>`);
            };
            const user = await UserService.getUserByEmail(validEmail);
            if(!user){
                return res.send(`Esta operación no es válida`);
            };
            if(inValidPassword(newPassword,user)){
                return res.render("resetPassView", {error:"contraseña inválida", token});
            };
            const userData = {
                ...user,
                password:createHash(newPassword)
            };
            await UserService.updateUser(user._id, userData);
            res.render("loginView", {message:"Contraseña actualizada"})
        } catch (error) {
            logger.error({status:"error", message:error.message})
        }
    }
}
