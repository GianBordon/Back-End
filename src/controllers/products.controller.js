import { ProductService } from "../services/products.service.js";

export class ProductsController{

    static getProducts = async(req,res)=>{
        try {
            const result = await ProductService.getProducts();
            res.json({status:"success", data:result});
        } catch (error) {
            res.status(500).json({status:"error", message:error.message});
        }
    };

    static createProduct =  async(req,res)=>{
        try {
            const product = req.body;
            const result = await ProductService.createProduct(product);
            res.json({status:"success", result});
        } catch (error) {
            res.status(500).json({status:"error", message:error.message});
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