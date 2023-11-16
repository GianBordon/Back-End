import { config } from "../config/config.js";
let usersDao;
let productsDao;
let cartsDao;
const persistence = config.server.persistence;

switch(persistence){
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
        const {CartsManagerMongo} = await import("./managers/mongo/cartsManagerMongo.js")
        usersDao = new UsersManagerMongo();
        productsDao = new ProductsManagerMongo();
        cartsDao = new CartsManagerMongo()
        break;
    }
};

export {usersDao, productsDao, cartsDao};