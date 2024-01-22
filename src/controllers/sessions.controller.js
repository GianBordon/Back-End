import { UserService } from "../services/users.service.js";
import { logger } from "../helpers/logger.js";
import { generateEmailToken, sendChangePasswordEmail, verifyEmailToken } from "../helpers/email.js"
import { createHash, inValidPassword } from "../utils.js";

export class SessionsController {

    static signUp = async (req, res) => {
        res.render("loginView",{message: "Usuario registrado exitosamente"})
    };

    static failSignUp = (req,res)=>{
        res.render('signupView', { error: 'No se pudo registrar el usuario' });
    };

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
    };

    static failLogin = (req,res)=>{
        res.render('loginView', { error: 'No se pudo iniciar sesion para el usuario' });
    };

    static failSignUpGitHub = (req,res)=>{
        res.redirect("/");
    };

    static logOut = async(req,res)=>{
        try {
            const user = {...req.user};
            user.last_connection = new Date();
            await UserService.updateUser(user._id, user);
            req.session.destroy(err=>{
                if(err) return res.render("profileView",{error:"No se pudo cerrar la sesion"});
                res.redirect("/");
            })
        } catch (error) {
            res.render("signupView",{error:"No se pudo registrar el usuario"});
        }
    };

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

    static resetPassword = async(req,res)=>{
        try {
            const token = req.query.token;
            const {newPassword} = req.body;
            const validEmail = verifyEmailToken(token)
            if(!validEmail){
                return res.send(`El enlace ya no es validateBody, genera un nuevo <a href="/forgot-password">enlace</a>`);
            };
            const user = await UserService.getUserByEmail(validEmail);
            if(!user){
                return res.send(`Esta operacion no es valida`);
            };
            if(inValidPassword(newPassword,user)){
                return res.render("resetPassView", {error:"contraseña invalida", token});
            };
            const userData = {
                ...user,
                password:createHash(newPassword)
            };
            await UserService.updateUser(user._id, userData);
            res.render("loginView", {message:"Contraseña Actualizada"})
        } catch (error) {
            logger.error({status:"error", message:error.message})
        }
    }
}