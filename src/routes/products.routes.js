import { Router } from "express";
import { productsService } from "../dao/index.js";

const router = Router();

    // Ruta raíz GET para listar todos los productos (con limitación opcional)
    router.get("/",async(req,res)=>{
        try {
            const result = await productsService.getProducts();
            res.json({status:"success", data:result});
        } catch (error) {
            res.status(500).json({status:"error", message:error.message});
        }
    });

    // Ruta POST para agregar un nuevo producto
    router.post("/", async(req,res)=>{
        try {
            const product = req.body;
            const result = await productsService.createProduct(product);
            res.json({status:"success", result});
        } catch (error) {
            res.status(500).json({status:"error", message:error.message});
        }
    });

    // Ruta GET para obtener un producto por ID
    router.get("/:productId", async(req,res)=>{
        try {
            const productId = req.params.productId.toString();
            const result = await productsService.getProductById(productId);
            res.json({status:"success", data:result});
        } catch (error) {
            res.status(500).json({status:"error", message:error.message});
        }
    });

    // Ruta PUT para actualizar un producto por su ID
    router.put("/:productId", async(req,res)=>{
        try {
            const product = req.body;
            const productId = req.params.productId.toString();
            const result = await productsService.updateProduct(productId,product);
            res.json({status:"success", data:result});
        } catch (error) {
            res.status(500).json({status:"error", message:error.message});
        }
    });

    // Ruta DELETE para eliminar un producto por su ID
    router.delete("/:productId", async(req,res)=>{
        try {
            const productId = req.params.productId.toString();
            const result = await productsService.deleteProduct(productId);
            res.json({status:"success", data:result});
        } catch (error) {
            res.status(500).json({status:"error", message:error.message});
        }
    });

export { router as productsRouter };


