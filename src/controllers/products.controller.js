import { ProductService } from "../services/products.service.js";
import { EError } from "../enums/EError.js";
import { CustomError } from "../services/errors/customError.service.js";
import { productCreateError } from "../services/errors/productCreateError.service.js";
import { sendProductDeletionEmail } from "../helpers/email.js";

export class ProductsController{

    // Método para obtener todos los productos
    static getProducts = async(req,res)=>{
        try {
            const result = await ProductService.getProducts();
            res.json({status:"success", data:result});
        } catch (error) {
            // En caso de error, devolver un mensaje de error con el estado 500
            res.status(500).json({status:"error", message:error.message});
        }
    };

    // Método para crear un nuevo producto
    static createProduct =  async(req,res, next)=>{
        try {
            const product = req.body;
            const { title, description, price, code, category, stock } = product;
            const userId = req.user._id;
            // Validar si los campos requeridos están presentes en la solicitud
            if (!title || !description || !price || !code || !category || !stock) {
                throw CustomError.createError({
                    name: "Create product error",
                    cause: productCreateError(product),
                    message: "Datos inválidos para crear un producto",
                    errorCode: EError.INVALID_BODY_JSON_ERROR
                });
            }
            product.owner = userId;
            // Crear el producto
            const result = await ProductService.createProducts(product);
            res.json({ status: "success", result });
        } catch (error) {
            // Pasar el error al siguiente middleware
            next(error); 
        }
    };

    // Método para obtener un producto por su ID
    static getProductById = async(req,res)=>{
        try {
            const productId = req.params.productId.toString();
            const result = await ProductService.getProductById(productId);
            res.json({status:"success", data:result});
        } catch (error) {
            res.status(500).json({status:"error", message:error.message});
        }
    };

    // Método para actualizar un producto
    static updateProduct = async(req,res)=>{
        try {
            const product = req.body;
            const productId = req.params.productId.toString();
            const result = await ProductService.updateProduct(productId,product);
            res.json({status:"success", data:result});
        } catch (error) {
            res.status(500).json({status:"error", message:error.message});
        }
    };

    // Método para eliminar un producto
    static deleteProduct = async (req, res) => {
        try {
            const productId = req.params.productId;
            // Obtener el producto antes de eliminarlo
            const result = await ProductService.getProductById(productId);
            // Eliminar el producto
            await ProductService.deleteProduct(productId);
            console.log("Producto eliminado:", result);
            // Enviar correo electrónico de eliminación
            await sendProductDeletionEmail(req.user.email, result.title);
            console.log("Correo electrónico de eliminación enviado a:", req.user.email);
            res.json({ status: "success", message: "Producto eliminado" });
        } catch (error) {
            console.error("Error:", error);
            res.json({ status: "error", message: error.message });
        }
    };
};
