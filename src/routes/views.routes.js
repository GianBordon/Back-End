import { Router } from "express";
import { ViewsController } from "../controllers/views.controller.js";

const router = Router();

// Ruta para mostrar la lista de productos
router.get('/loginView', ViewsController.getProducts);
// Ruta para mostrar la lista de productos
router.get('/', ViewsController.showProducts);
// Ruta para ver detalles de un producto
router.get('/products/:productId', ViewsController.getDetailsProduct);
// Ruta para visualizar un carrito específico
router.get('/carrito/:cid', ViewsController.getCart);
// Ruta para Iniciar Sesion 
router.get("/signup", ViewsController.singUp);
// Ruta para ver el Perfil del usuario 
router.get("/profile", ViewsController.profile);
export {router as viewsRouter}