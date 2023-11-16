import { cartsModel } from "./models/carts.model.js";

export class CartsManagerMongo {
    constructor() {
        this.model = cartsModel;
    }
    // Metodo para obtener los carritos
    async getCarts() {
        try {
            const result = await this.model.find().lean();
            return result;
        } catch (error) {
            console.log("getCarts: ", error.message);
            throw new Error("No se pudieron obtener los carritos");
        };
    };
    // Metodo para obtener un carrito segun su ID
    async getCartById(cartId) {
        try {
            const result = await this.model.findById(cartId).populate("products.productId").lean();
            if (!result) {
                throw new Error(`El carrito con el ID: '${cartId}' no existe.`);
            };
            return result;
        } catch (error) {
            console.log("getCartById: ", error.message);
            throw new Error("No se pudo obtener el carrito");
        };
    };
    // Metodo para crear un carrito
    async createCart() {
        try {
            const newCart = {};
            const result = await this.model.create(newCart);
            return result;
        } catch (error) {
            console.log("createCart: ", error.message);
            throw new Error("No se pudo crear el carrito");
        };
    };
    // Metodo para agregar un producto a un carrito segun el ID del carrito y el ID del producto
    async addProduct(cartId, productId) {
        try {
            const cart = await this.getCartById(cartId);
            const existingProduct = cart.products.find((product) => product.productId._id.toString() === productId);
            // Verifico si existe el producto y agrego la cantidad entonces
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                const newProductCart = {
                    productId: productId,
                    quantity: 1
                };
                cart.products.push(newProductCart);
            };

            const result = await this.model.findByIdAndUpdate(cartId, cart, { new: true });
            return result;
        } catch (error) {
            console.log("addProduct: ", error.message);
            throw new Error("No se pudo agregar el producto al carrito");
        };
    };
    // Metodo para eliminar un producto de un carrito segun su ID
    async deleteProduct(cartId, productId) {
        try {
            const cart = await this.getCartById(cartId);
            const existingProduct = cart.products.find((product) => product.productId && product.productId._id.toString() === productId);
            if (existingProduct) {
                cart.products = cart.products.filter((product) => product.productId && product.productId._id.toString() !== productId);
                const result = await this.model.findByIdAndUpdate(cartId, cart, { new: true });
                return result;
            } else {
                throw new Error("El producto no se puede eliminar porque no ha sido agregado");
            }
        } catch (error) {
            console.log("deleteProduct: ", error.message);
            throw new Error("No se pudo eliminar el producto del carrito");
        }
    }
    // Metodo para modificar la cantidad de un producto segun su ID y el ID del carrito 
    async updateProductCart(cartId, productId, newQuantity) {
        try {
            const cart = await this.getCartById(cartId);
            const productIndex = cart.products.findIndex(elm=>elm.productId._id == productId);
            if(productIndex>=0){
                // //si el producto existe en el carrito
                cart.products[productIndex].quantity = newQuantity;
                const result = await this.model.findByIdAndUpdate(cartId,cart, {new:true});
                return result;
            } else {
                throw new Error("El producto no se puede actualizar porque no ha sido agregado");
            }
        } catch (error) {
            console.log("updateProductCart",error.message);
            throw new Error("No se pudo actualizar el producto al carrito");
        }
    };
    // Método para eliminar un carrito por su ID
    async deleteCart(cartId) {
        try {
            const result = await this.model.findByIdAndDelete(cartId);
            if (!result) {
                throw new Error(`El carrito con el ID: '${cartId}' no existe.`);
            }
            return result;
        } catch (error) {
            console.log(error.message);
            throw new Error("No se pudo eliminar el carrito");
        };
    };
};
