import { productsModel } from "./models/products.model.js";
import { logger } from "../../../helpers/logger.js";

export class ProductsManagerMongo {
    constructor() {
        // Inicializa el modelo de productos
        this.model = productsModel;
    }

    // Método para crear un nuevo producto
    async createProduct(productInfo) {
        try {
            // Crea un nuevo producto en la base de datos
            const result = await this.model.create(productInfo);
            return result;
        } catch (error) {
            // Captura y maneja cualquier error que ocurra durante la creación del producto
            logger.error("createProduct: ", error.message);
            throw new Error("Se produjo un error al crear el producto");
        }
    }

    // Método para obtener todos los productos
    async getProducts() {
        try {
            // Obtiene todos los productos de la base de datos
            const result = await this.model.find().lean();
            return result;
        } catch (error) {
            // Captura y maneja cualquier error que ocurra al obtener los productos
            logger.error("getProducts: ", error.message);
            throw new Error("Se produjo un error al obtener los productos");
        }
    }

    // Método para obtener productos paginados
    async getProductsPaginate(query, options) {
        try {
            // Obtiene productos paginados de la base de datos
            const result = await this.model.paginate(query, options);
            return result;
        } catch (error) {
            // Captura y maneja cualquier error que ocurra al obtener productos paginados
            logger.error("getProductsPaginate: ", error.message);
            throw new Error("Se produjo un error al obtener los productos paginados");
        }
    }

    // Método para obtener un producto por su ID
    async getProductById(productId) {
        try {
            // Obtiene un producto por su ID de la base de datos
            const result = await this.model.findById(productId).lean();
            return result;
        } catch (error) {
            // Captura y maneja cualquier error que ocurra al obtener el producto por su ID
            logger.error("getProductById: ", error.message);
            throw new Error("Se produjo un error al obtener el producto");
        }
    }

    // Método para actualizar un producto por su ID
    async updateProduct(productId, newProductInfo) {
        try {
            // Actualiza un producto por su ID en la base de datos
            const result = await this.model.findByIdAndUpdate(productId, newProductInfo, { new: true }).lean();
            if (!result) {
                throw new Error("No se pudo encontrar el producto a actualizar");
            }
            return result;
        } catch (error) {
            // Captura y maneja cualquier error que ocurra al actualizar el producto
            logger.error("updateProduct: ", error.message);
            throw new Error("Se produjo un error al actualizar el producto");
        }
    }

    // Método para eliminar un producto por su ID
    async deleteProduct(productId) {
        try {
            // Elimina un producto por su ID de la base de datos
            const result = await this.model.findByIdAndDelete(productId).lean();
            if (!result) {
                throw new Error("No se pudo encontrar el producto a eliminar");
            }
            return result;
        } catch (error) {
            // Captura y maneja cualquier error que ocurra al eliminar el producto
            logger.error("deleteProduct: ", error.message);
            throw new Error("Se produjo un error al eliminar el producto");
        }
    }
}
