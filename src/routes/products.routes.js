import { Router } from "express";
import { ProductsController } from "../controllers/products.controller.js";
import { isAuth, checkRole  } from "../middlewares/auth.js";
import { uploadImgProducts } from "../utils.js";

const router = Router();

    // Ruta raíz GET para listar todos los productos (con limitación opcional)
    router.get("/", ProductsController.getProducts);
    // Ruta POST para crear un nuevo producto
    router.post("/", isAuth, checkRole(["admin","premium"]), uploadImgProducts.single("thumbnail"), ProductsController.createProduct);
    // Ruta GET para obtener un producto por ID
    router.get("/:productId", ProductsController.getProductById);
    // Ruta PUT para actualizar un producto por su ID
    router.put("/:productId",isAuth,checkRole(["admin","premium"]),  ProductsController.updateProduct);
    // Ruta DELETE para eliminar un producto por su ID
    router.delete("/:productId",isAuth,checkRole(["admin","premium"]),  ProductsController.deleteProduct);

export { router as productsRouter };


