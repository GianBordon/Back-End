import express from "express";
import { checkRole } from "../middlewares/auth.js";
import { CartsController } from "../controllers/carts.controller.js";

const router = express.Router();

router.get("/", CartsController.getCarts);
router.post("/", CartsController.createCart);

router.get("/:cid", CartsController.getCartById);
router.delete("/:cid", CartsController.deleteProductsCart);
router.put("/:cid", CartsController.updateCart);

router.delete("/:cid/products/:pid/delete", CartsController.deleteProductCart);
router.put("/:cid/products/:pid/update", CartsController.updateQuantityCart);
router.post("/:cid/products/:pid/add", checkRole(["user", "premium"]), CartsController.addProductCart);

export { router as cartsRouter };



