import passport from "passport";
import { Router } from "express";
import { config } from "../config/config.js";
import { SessionsController } from "../controllers/sessions.controller.js";
import { ViewsController } from "../controllers/views.controller.js";

const router = Router();

// Rutas de registro
router.post('/signup',passport.authenticate("signupLocalStrategy",{
    failureRedirect:"/api/sessions/fail-signup",
    }), SessionsController.signUp);
router.get('/fail-signup', SessionsController.failSignUp);
// Rutas de Loguin
router.post('/login', passport.authenticate("loginLocalStrategy", {
    failureRedirect:"/api/sessions/fail-login"
}), ViewsController.showProducts);
router.get('/fail-login', SessionsController.failLogin);
//Ruta de solicitud registro con github
router.get("/signup-github", passport.authenticate("signupGithubStrategy"));
//ruta del callback con github
router.get(config.github.callbackUrl, passport.authenticate("signupGithubStrategy",{
    failureRedirect:"/api/sessions/fail-signup"
}), SessionsController.failSignUpGitHub);
// Ruta de Logout
router.get("/logout", SessionsController.logOut);

export {router as sessionsRouter};