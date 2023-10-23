import express from 'express';
import session from "express-session";
import MongoStore from "connect-mongo";
import path from "path";
import cookieParser from "cookie-parser"
import passport from "passport";
import { engine } from 'express-handlebars';
import { __dirname } from "./utils.js";
import { Server } from 'socket.io'; 
import { connectDB } from './config/dbConnection.js';
import { config  } from "./config/config.js";
import { initializePassport } from "./config/passport.config.js";

import { viewsRouter } from './routes/views.routes.js';
import { sessionsRouter } from "./routes/sessions.routes.js";
import { productsRouter } from './routes/products.routes.js';
import { cartsRouter } from './routes/carts.routes.js';

const app = express();
const port = process.env.PORT || 8080;

// Midelware para los archivos js y css
app.use(express.static(path.join(__dirname, "/public")));

// Midelware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

//servidor de express con el protocolo http
const httpServer = app.listen(port, () => console.log(`Servidor Express escuchando en el puerto ${port}`));

// Conexion base de datos 
connectDB();

//configuracion del motor de plantillas
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, "/views"));

// configuración de session
app.use(session({
    store: MongoStore.create({
        ttl:3000,
        mongoUrl:config.mongo.url
    }),
    secret:"secretSessionCoder",
    resave:true,
    saveUninitialized:true
}));
console.log('Sesiones configuradas correctamente');

//configurar passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//Rutas para las Vistas
app.use(viewsRouter);

// Rutas de productos y carritos
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use("/api/sessions", sessionsRouter);

// Configurar WebSocket
const io = new Server(httpServer);

io.on('connection', (socket) => {
    console.log('Cliente Conectado:', socket.id);
});
