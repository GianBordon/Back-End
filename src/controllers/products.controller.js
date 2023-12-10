import { ProductService } from "../services/products.service.js";
import { EError } from "../enums/EError.js";
import { CustomError } from "../services/errors/customError.service.js";
import { productCreateError } from "../services/errors/productCreateError.service.js";

export class ProductsController{

    static getProducts = async(req,res)=>{
        try {
            const result = await ProductService.getProducts();
            res.json({status:"success", data:result});
        } catch (error) {
            res.status(500).json({status:"error", message:error.message});
        }
    };

    static createProduct =  async(req,res, next)=>{
        try {
            const product = req.body;
            const { title, description, price, code, category, stock } = product;
            if (!title || !description || !price || !code || !category || !stock) {
                throw CustomError.createError({
                    name: "Create product error",
                    cause: productCreateError(product),
                    message: "Datos Invalidos para crear un producto ",
                    errorCode: EError.INVALID_BODY_JSON_ERROR
                });
            }
            const result = await ProductService.createProducts(product);
            res.json({ status: "success", result });
        } catch (error) {
            next(error); 
        }
    };

    static getProductById = async(req,res)=>{
        try {
            const productId = req.params.productId.toString();
            const result = await ProductService.getProductById(productId);
            res.json({status:"success", data:result});
        } catch (error) {
            res.status(500).json({status:"error", message:error.message});
        }
    };

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

    static deleteProduct = async(req,res)=>{
        try {
            const productId = req.params.productId.toString();
            const result = await ProductService.deleteProduct(productId);
            res.json({status:"success", data:result});
        } catch (error) {
            res.status(500).json({status:"error", message:error.message});
        }
    };
}