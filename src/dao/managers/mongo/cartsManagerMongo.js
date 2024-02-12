import { cartsModel } from "./models/carts.model.js";
import { logger } from "../../../helpers/logger.js";

export class CartsManagerMongo {
    constructor() {
        // Inicializa el modelo de carritos
        this.model = cartsModel;
    }

    // Método para obtener todos los carritos
    async getCarts() {
        try {
            // Obtiene todos los carritos de la base de datos
            const result = await this.model.find().lean();
            return result;
        } catch (error) {
            // Captura y maneja cualquier error que ocurra al obtener los carritos
            logger.error("getCarts: ", error.message);
            throw new Error("No se pudieron obtener los carritos");
        }
    }

    // Método para obtener un carrito por su ID
    async getCartById(cartId) {
        try {
            // Obtiene un carrito por su ID de la base de datos, también popula los productos asociados
            const result = await this.model.findById(cartId).populate("products.productId").lean();
            if (!result) {
                throw new Error(`El carrito con el ID: '${cartId}' no existe.`);
            }
            return result;
        } catch (error) {
            // Captura y maneja cualquier error que ocurra al obtener el carrito por su ID
            logger.error("getCartById: ", error.message);
            throw new Error("No se pudo obtener el carrito");
        }
    }

    // Método para crear un nuevo carrito
    async createCart() {
        try {
            // Crea un nuevo carrito en la base de datos
            const newCart = {};
            const result = await this.model.create(newCart);
            return result;
        } catch (error) {
            // Captura y maneja cualquier error que ocurra al crear el carrito
            logger.error("createCart: ", error.message);
            throw new Error("No se pudo crear el carrito");
        }
    }

    // Método para agregar un producto a un carrito según el ID del carrito y el ID del producto
    async addProduct(cartId, productId) {
        try {
            // Agrega un producto al carrito en la base de datos
            const result = await this.model.findOneAndUpdate(
                { _id: cartId, 'products.productId': { $ne: productId } }, // Evita duplicados
                {
                    $push: {
                        products: {
                            productId: productId,
                            quantity: 1
                        }
                    }
                },
                { new: true }
            );

            if (!result) {
                throw new Error("No se pudo agregar el producto al carrito");
            }

            return result;
        } catch (error) {
            // Captura y maneja cualquier error que ocurra al agregar el producto al carrito
            logger.error("addProduct: ", error.message);
            throw new Error("No se pudo agregar el producto al carrito");
        }
    }

    // Método para eliminar un producto de un carrito según su ID
    async deleteProduct(cartId, productId) {
        try {
            const cart = await this.getCartById(cartId);
            console.log("Cart:", cart); // Verificar el contenido del carrito
            const existingProduct = cart.products.find((product) => product._id.toString() === productId);
            console.log("Existing Product:", existingProduct); // Verificar si se encontró el producto en el carrito
            if (existingProduct) {
                cart.products = cart.products.filter((product) => product._id.toString() !== productId);
                const result = await this.model.findByIdAndUpdate(cartId, cart, { new: true });
                console.log("Result:", result); // Verificar el resultado después de actualizar el carrito
                return result;
            } else {
                throw new Error("El producto no se puede eliminar porque no ha sido agregado");
            }
        } catch (error) {
            console.log("deleteProduct Error:", error.message); // Verificar si hay errores
            throw new Error("No se pudo eliminar el producto del carrito");
        }
    }

    // Método para modificar la cantidad de un producto según su ID y el ID del carrito
    async updateProductCart(cartId, productId, newQuantity) {
        try {
            // Obtiene el carrito por su ID
            const cart = await this.getCartById(cartId);
            console.log("Cart:", cart); // Verificar el contenido del carrito
            // Busca el índice del producto en el carrito
            const productIndex = cart.products.findIndex((elm) => {
                return elm.productId && elm.productId.toString() === productId;
            });
            console.log("Product Index:", productIndex); // Verificar el índice del producto en el carrito
            if (productIndex >= 0) {
                // Si el producto existe en el carrito, actualiza la cantidad
                cart.products[productIndex].quantity = newQuantity;
                console.log("Updated Cart:", cart); // Verificar el carrito actualizado
                const result = await this.model.findByIdAndUpdate(cartId, cart, { new: true });
                console.log("Update Result:", result); // Verificar el resultado después de actualizar el carrito
                return result;
            } else {
                throw new Error("El producto no se puede actualizar porque no ha sido agregado");
            }
        } catch (error) {
            // Captura y maneja cualquier error que ocurra al actualizar la cantidad del producto en el carrito
            console.log("updateProductCart Error:", error.message); // Verificar si hay errores
            throw new Error("No se pudo actualizar el producto en el carrito");
        }
    }

    // Método para eliminar un carrito por su ID
    async deleteCart(cartId) {
        try {
            // Elimina un carrito por su ID de la base de datos
            const result = await this.model.findByIdAndDelete(cartId);
            if (!result) {
                throw new Error(`El carrito con el ID: '${cartId}' no existe.`);
            }
            return result;
        } catch (error) {
            // Captura y maneja cualquier error que ocurra al eliminar el carrito
            logger.error(error.message);
            throw new Error("No se pudo eliminar el carrito");
        };
    };
};