import { productsModel } from "./models/products.model.js";
import { logger } from "../../../helpers/logger.js";

export class ProductsManagerMongo {
    constructor() {
        this.model = productsModel;
    }
    // Metodo para crear un producto
    async createProduct(productInfo) {
        try {
            const result = await this.model.create(productInfo);
            return result;
        } catch (error) {
            return {status:"error", error:error};
        };
    };
// Metodo para obtener los productos 
    async getProducts() {
        try {
            const result = await this.model.find().lean();
            return result;
        } catch (error) {
            logger.error("getProducts: ", error.message);
            throw new Error("Se produjo un error al obtener los productos");
        };
    };
// Metodo para agregar las paginas, los limites,etc
    async getProductsPaginate(query,options) {
        try { 
            const result = await this.model.paginate(query,options);
            return result;
        } catch (error) {
            logger.error("getProductsPaginate: ", error.message);
            throw new Error("Se produjo un error al obtener los productos paginados");
        };
    };
// Metodo para obtener un producto segun si ID
    async getProductById(productId) {
        try {
            const result = await this.model.findById(productId).lean();
            return result;
        } catch (error) {
            logger.error("getProductById: ", error.message);
            throw new Error("Se produjo un error al obtener el producto");
        };
    };
// Metodo para actualizar un producto segun su ID
    async updateProduct(productId, newProductInfo) {
        try {
            const result = await this.model.findByIdAndUpdate(productId, newProductInfo, { new: true }).lean();
            if (!result) {
                throw new Error("No se pudo encontrar el producto a actualizar");
            }
            return result;
        } catch (error) {
            logger.error("updateProduct: ", error.message);
            throw new Error("Se produjo un error al actualizar el producto");
        };
    };
// Metodo para eliminar un producto segun su ID
    async deleteProduct(productId) {
        try {
            const result = await this.model.findByIdAndDelete(productId).lean();
            if (!result) {
                throw new Error("No se pudo encontrar el producto a eliminar");
            };
            return result;
        } catch (error) {
            logger.error("deleteProduct: ", error.message);
            throw new Error("Se produjo un error al eliminar el producto");
        };
    };
};