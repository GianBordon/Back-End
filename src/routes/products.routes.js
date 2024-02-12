import { Router } from "express";
import { ProductsController } from "../controllers/products.controller.js";
// import { isAuth, checkRole  } from "../middlewares/auth.js";


const router = Router();

    // Ruta raíz GET para listar todos los productos (con limitación opcional)
    router.get("/", ProductsController.getProducts);
    // Ruta POST para crear un nuevo producto
    router.post("/",  ProductsController.createProduct);
    // Ruta GET para obtener un producto por ID
    router.get("/:productId", ProductsController.getProductById);
    // Ruta PUT para actualizar un producto por su ID
    router.put("/:productId",  ProductsController.updateProduct);
    // Ruta DELETE para eliminar un producto por su ID
    router.delete("/:productId",  ProductsController.deleteProduct);

export { router as productsRouter };


