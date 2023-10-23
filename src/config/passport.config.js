import passport from "passport";
import localStrategy from "passport-local";
import { createHash, inValidPassword } from "../utils.js";
import { usersModel } from "../dao/mongo/models/users.model.js";

export const initializePassport = () =>{
    // Estrategia de registro de usuario 
    passport.use("signupLocalStrategy", new localStrategy(
        {
            passReqToCallback:true,
            usernameField: "email",
        },
        async (req,username,password,done)=>{
            const {first_name} = req.body;
            try {
                const user = await usersModel.findOne({email:username});
                if(user){
                    return done(null, false);
                } 
                const newUser = {
                    first_name,
                    email:username,
                    password:createHash(password)
                };
                const userCreated = await usersModel.create(newUser);
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
                const user = await usersModel.findOne({email:username});
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
    passport.serializeUser((user,done)=>{
            done(null, user._id);
        });
    passport.deserializeUser(async(id,done)=>{
            const user = await usersModel.findById(id);
            done(null,user);
        });
    };
