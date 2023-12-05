import { Router } from "express";
import { MockController } from "../controllers/moks.controller.js";

const router = Router();

// Ruta para generar 100 productos aleatorios mediante MOCK
router.get("/mockingproducts", MockController.generateProduct);

export {router as mockRouter};