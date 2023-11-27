import { Router } from 'express';
import { CartController } from '../controllers/carts.controller.js';

const router = Router();

// Ruta para obtener todos los carritos
router.get("/", CartController.getCarts);
// Ruta para crear un nuevo carrito
router.post("/", CartController.createCart);
// Ruta para obtener los productos de un carrito
router.get("/:cid", CartController.getCartById);
// Ruta para eliminar un producto del carrito
router.delete('/:cid/products/:pid', CartController.deleteProductCart);
// Ruta para actualizar el carrito con un arreglo de productos
router.put('/:cid', CartController.updateCart);
// Ruta para actualizar la cantidad de un producto en el carrito
router.put('/:cid/products/:pid', CartController.updateQuantityCart);
// Ruta para eliminar todos los productos del carrito
router.delete('/:cid', CartController.deleteProductsCart);
// Ruta para agregar un producto al carrito
router.post("/:cid/products/:pid", CartController.addProductCart);
// Ruta para generar un ticket
router.post("/:cid/purchase", CartController.purchaseCart);

export { router as cartsRouter };


