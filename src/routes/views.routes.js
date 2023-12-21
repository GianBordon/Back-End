import { Router } from "express";
import { ViewsController } from "../controllers/views.controller.js";

const router = Router();

// Ruta para mostrar la lista de productos
router.get('/loginView', ViewsController.getProducts);
// Ruta para mostrar la lista de productos
router.get('/', ViewsController.showProducts);
// Ruta para mostrar la lista de productos
router.get('/ver-todo', ViewsController.showProducts);
// Ruta para mostrar la lista de productos por remeras
router.get('/remeras', ViewsController.showRemeras);
// Ruta para mostrar la lista de productos por Pantalones
router.get('/pantalones', ViewsController.showPantalones);
// Ruta para mostrar la lista de productos por Buzos
router.get('/buzos', ViewsController.showBuzos);
// Ruta para mostrar la lista de productos por Sweater
router.get('/sweater', ViewsController.showSweater);
// Ruta para ver detalles de un producto
router.get('/products/:productId', ViewsController.getDetailsProduct);
// Ruta para visualizar un carrito específico
router.get('/carrito/:cid', ViewsController.getCart);
// Ruta para Iniciar Sesion 
router.get("/signup", ViewsController.singUp);
// Ruta para ver el Perfil del usuario 
router.get("/profile", ViewsController.profile);
// Ruta para test de logger
router.get("/testLogger", ViewsController.testLogger);
// Ruta para el olvido de Contraseña
router.get("/forgot-password", ViewsController.forgotPassword)
// Ruta para reestablecer la contraceña
router.get("/reset-password", ViewsController.resetPassword)

export {router as viewsRouter}