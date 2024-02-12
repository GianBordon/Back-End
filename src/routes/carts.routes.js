import express from "express";
// import { checkRole } from "../middlewares/auth.js";
import { CartsController } from "../controllers/carts.controller.js";

const router = express.Router();

router.get("/", CartsController.getCarts);
router.post("/", CartsController.createCart);

router.get("/:cid", CartsController.getCartById);  

router.delete('/:cid/products/:pid', CartsController.deleteProductCart);
router.put('/:cid/products/:pid', CartsController.updateQuantityCart);
router.post('/:cid/products/:pid', CartsController.addProductToCart);

export { router as cartsRouter };
