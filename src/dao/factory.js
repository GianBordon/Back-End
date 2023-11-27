import { program } from 'commander';
import { config } from "../config/config.js";
let usersDao;
let productsDao;
let cartsDao;
let ticketsDao;


program
    .option('-p, --persistence <type>', 'Tipo de persistencia (file o mongo)', 'mongo') 

    const persistenceType = program.opts().persistence; 

switch(persistenceType){
    case "file":{
        const {ContactsManagerFile} = await import("./managers/file/cartsMemoryFiles.js");
        const {ProductsManagerFile} = await import("./managers/file/productsManagerFiles.js");
        contactsDao = new ContactsManagerFile();
        productsDao = new ProductsManagerFile();
        break;
    }
    case "mongo":{
        const {connectDB} = await import("../config/dbConnection.js");
        connectDB();
        const {UsersManagerMongo} = await import("./managers/mongo/usersManagerMongo.js");
        const {ProductsManagerMongo} = await import("./managers/mongo/productsManagerMongo.js");
        const {CartsManagerMongo} = await import("./managers/mongo/cartsManagerMongo.js");
        const {TicketsManagerMongo} = await import("./managers/mongo/ticketManagerMongo.js");
        usersDao = new UsersManagerMongo();
        productsDao = new ProductsManagerMongo();
        cartsDao = new CartsManagerMongo();
        ticketsDao = new TicketsManagerMongo();
        break;
    }
};

config.server.persistence = persistenceType;

export {usersDao, productsDao, cartsDao, ticketsDao};