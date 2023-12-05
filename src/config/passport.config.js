import passport from "passport";
import localStrategy from "passport-local";
import githubStrategy from "passport-github2";
import { createHash, inValidPassword } from "../utils.js";
import { usersModel } from "../dao/managers/mongo/models/users.model.js";
import { config } from "./config.js";
import { UserService } from "../services/users.service.js"
import { CustomError } from "../services/customError.service.js";
import { userCreateError } from "../services/userCreateError.service.js";
import { EError } from "../enums/EError.js";

export const initializePassport = () =>{
    // Estrategia de registro de usuario 
    passport.use("signupLocalStrategy", new localStrategy(
        {
            passReqToCallback:true,
            usernameField: "email",
        },
        async (req,username,password,done)=>{
            const {first_name,last_name,age} = req.body;
            if(!first_name || !last_name || !age || !username){
                CustomError.createError({
                    name:"Create user error",
                    cause: userCreateError(req.body),
                    message:"Datos invalidos para crear el usuario",
                    errorCode: EError.INVALID_BODY_JSON_ERROR
                });
            }
            try {
                const user = await UserService.getUserByEmail(username);
                if(user){
                    return done(null, false);
                } 
                const newUser = {
                    first_name,
                    last_name,
                    age,
                    email:username,
                    password:createHash(password)
                };
                const userCreated = await UserService.createUser(newUser);
                return done(null, userCreated);
            } catch (error) {
                return done(error)
            }
        }
        ));
    // Estrategia de logueo de usuario 
    passport.use("loginLocalStrategy", new localStrategy(
        {
            usernameField: "email",
        },
        async (username,password,done)=>{
            try {
                const user = await UserService.getUserByEmail(username);
                if(!user){
                    return done(null, false);
                } 
                if(!inValidPassword(password,user)){
                    return done(null,false);
                }
                return done(null,user);
            } catch (error) {
                return done(error)
            }
        }
        ));
    //Estrategia de registro con github
    passport.use("signupGithubStrategy", new githubStrategy(
        {
            clientID: config.github.clientId,
            clientSecret: config.github.clientSecret,
            callbackURL: `http://localhost:8080/api/sessions${config.github.callbackUrl}`
        },
        async(accessToken,refreshToken,profile,done)=>{
            try {
                const user = await usersModel.findOne({email:profile.username});
                if(user){
                    //el usuario ya esta registrado
                    return done(null,user);
                }
                //El usuario no esta registrado
                const newUser = {
                    first_name:profile._json.name,
                    email:profile.username,
                    password:" "
                };
                console.log(newUser);
                const userCreated = await usersModel.create(newUser);
                return done(null,userCreated);
            } catch (error) {
                return done(error)
            }
        }
    ));
    passport.serializeUser((user,done)=>{
            done(null, user._id);
        });
    passport.deserializeUser(async(id,done)=>{
            const user = await UserService.getUserById(id);
            done(null,user);
        });
    };
