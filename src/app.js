import express from 'express';
import session from "express-session";
import MongoStore from "connect-mongo";
import path from "path";
import cookieParser from "cookie-parser"
import bodyParser from 'body-parser';
import passport from "passport";
import { engine } from 'express-handlebars';
import { __dirname } from "./utils.js";
import { Server } from 'socket.io'; 
import { config  } from "./config/config.js";
import { initializePassport } from "./config/passport.config.js";
import { errorHandler } from './middlewares/errorHandler.js';
import { logger } from './helpers/logger.js';

import { viewsRouter } from './routes/views.routes.js';
import { sessionsRouter } from "./routes/sessions.routes.js";
import { productsRouter } from './routes/products.routes.js';
import { cartsRouter } from './routes/carts.routes.js';
import { messagesRouter } from './routes/messages.routes.js';
import { mockRouter } from './routes/mocks.routes.js';
import { usersRouter } from "./routes/users.routes.js";

const app = express();
const port = process.env.PORT || 8080;

// Midelware para los archivos js y css
app.use(express.static(path.join(__dirname, "/public")));

// Midelware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());

//servidor de express con el protocolo http
const httpServer = app.listen(port, () => logger.informativo(`Servidor Express escuchando en el puerto ${port}`));

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
    secret:config.server.secretSessions,
    resave:true,
    saveUninitialized:true
}));
logger.informativo('Sesiones configuradas correctamente');

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
app.use("/api/messages", messagesRouter);
app.use("/api/users", usersRouter);
app.use("/api/mocks", mockRouter);

// Midelware de Errores
app.use(errorHandler);

// Configurar WebSocket
const io = new Server(httpServer);

io.on('connection', (socket) => {
    logger.informativo('Cliente Conectado:', socket.id);
});
