import dotenv from "dotenv";

dotenv.config();

export const config ={
    server:{
        secretSessions: process.env.SECRET_SESSIONS,
        persistence: process.env.PERSISTENCE,
        port:process.env.PORT,
        env:process.env.NODE_ENVIRONMENT || "development"
    },
    mongo:{
        url: process.env.MONGO_URL
    },
    github:{
        callbackUrl: process.env.GITHUB_CALLBACK_URL,
        clientId: process.env.GITHUB_CLIENTE_ID,
        clientSecret: process.env.GITHUB_CLIENTE_SECRET
    },
    gmail:{
        account:process.env.GMAIL_ACCOUNT,
        password:process.env.GMAIL_PASSWORD,
        secretToken:process.env.TOKEN_EMAIL
    },
    twilio:{
        account:process.env.TWILIO_ACCOUNT_ID,
        token:process.env.TWILIO_TOKEN,
        phone:process.env.TWILIO_PHONE
    }
}
