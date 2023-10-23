// import { productsManagerFiles } from "./file/productsManagerFiles";
// import { CartsManagerFiles } from "./files/cartsManagerFiles.js";
import { __dirname } from "../utils.js";
// import path from "path";
import { ProductsManagerMongo } from "./mongo/productsManagerMongo.js";
import { CartsManagerMongo } from "./mongo/cartsManagerMongo.js";
import { UsersManagerMongo } from "./mongo/usersManagerMongo.js"

export const productsService = new ProductsManagerMongo();
export const cartsService = new CartsManagerMongo();
export const usersService = new UsersManagerMongo();

