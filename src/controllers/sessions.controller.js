export class SessionsController {

    static signUp = async (req, res) => {
        res.render("loginView",{message: "Usuario registrado exitosamente"})
    };

    static failSignUp = (req,res)=>{
        res.render('signupView', { error: 'No se pudo registrar el usuario' });
    };

    static login = async (req, res) => {
        res.redirect("/")
    };

    static failLogin = (req,res)=>{
        res.render('loginView', { error: 'No se pudo iniciar sesion para el usuario' });
    };

    static failSignUpGitHub = (req,res)=>{
        res.redirect("/");
    };

    static logOut = async(req,res)=>{
        try {
            req.session.destroy(err=>{
                if(err) return res.render("profileView",{error:"No se pudo cerrar la sesion"});
                res.redirect("/");
            })
        } catch (error) {
            res.render("signupView",{error:"No se pudo registrar el usuario"});
        }
    };
}