import { Router } from "express";
import { ProductsController } from "../controllers/products.controller.js";
import { checkRole } from "../middlewares/auth.js";

const router = Router();

    // Ruta raíz GET para listar todos los productos (con limitación opcional)
    router.get("/", ProductsController.getProducts);
    // Ruta POST para agregar un nuevo producto
    router.post("/", checkRole(["admin"]), ProductsController.createProduct);
    // Ruta GET para obtener un producto por ID
    router.get("/:productId", ProductsController.getProductById);
    // Ruta PUT para actualizar un producto por su ID
    router.put("/:productId",checkRole(["admin"]),  ProductsController.updateProduct);
    // Ruta DELETE para eliminar un producto por su ID
    router.delete("/:productId",checkRole(["admin"]),  ProductsController.deleteProduct);

export { router as productsRouter };


