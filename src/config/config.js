import dotenv from "dotenv";

dotenv.config();

export const config ={
    server:{
        secretSessions: process.env.SECRET_SESSION
    },
    mongo:{
        url: process.env.MONGO_URL
    },
    github:{
        callbackUrl: process.env.GITHUB_CALLBACK_URL,
        clientId: process.env.GITHUB_CLIENTE_ID,
        clientSecret: process.env.GITHUB_CLIENTE_SECRET
    }
}