import fs from "fs";

// Creo y exporto la clase con los metodos a utilizar en las rutas 
export class CartsManagerFiles {
    constructor(path) {
        this.pathFile = path;
    }

    // Verifico si existe el archivo
    fileExists() {
        return fs.existsSync(this.pathFile);
    }

    // Metodo para obtener los carritos
    async getCarts() {
        try {
            if (this.fileExists()) {
                const contenidoString = await fs.promises.readFile(this.pathFile, "utf-8");
                const carts = JSON.parse(contenidoString);
                return carts;
            } else {
                throw new Error("No se pudieron obtener los carritos");
            }
        } catch (error) {
            throw error;
        }
    }

    // Metodo para crear un carrito 
    async createCart() {
        try {
            if (this.fileExists()) {
                const contenidoString = await fs.promises.readFile(this.pathFile, "utf-8");
                const carts = JSON.parse(contenidoString);
                const newCart = {
                    id: carts.length === 0 ? 1 : carts[carts.length - 1].id + 1,
                    products: [],
                };
                carts.push(newCart);
                await fs.promises.writeFile(this.pathFile, JSON.stringify(carts, null, '\t'));
                return newCart;
            } else {
                throw new Error("No se pudieron obtener los carritos");
            }
        } catch (error) {
            throw error;
        }
    }
    
    // Metodo para obtener todos los carritos existentes
    async getAllCarts() {
        try {
            const carts = await this.getCarts();
            return carts;
        } catch (error) {
            throw error;
        }
    }
    
    // Metodo para agregar un producto a un carrito 
    async addProduct(cartId, productId) {
        try {
            const carts = await this.getCarts();
            const cart = carts.find((c) => c.id === cartId);
            if (!cart) {
                throw new Error("Carrito no encontrado");
            }

            cart.products.push(productId);

            await fs.promises.writeFile(this.pathFile, JSON.stringify(carts, null, '\t'));
        } catch (error) {
            throw error;
        }
    }

    // Metodo para agregar la cantidad y que se sume por la cantidad que le estoy pidiendo 
    async addProductToCart(cartId, productId, quantity = 1) {
    const carts = await this.getCarts();

    const cartIndex = carts.findIndex((cart) => cart.id === cartId);

    if (cartIndex !== -1) {
        const cart = carts[cartIndex];
        const productIndex = cart.products.findIndex((product) => product.product === productId);

        if (productIndex !== -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }
    } else {
        const newCart = {
            products: [{ product: productId, quantity }],
        };
        carts.push(newCart);
    }

    await this.saveCarts(carts);

    return carts.find((cart) => cart.id === cartId);
    }   
    
    // Metodo para obtener carritos por su ID
    async getCartById(cartId) {
        try {
            const carts = await this.getCarts();
            const cart = carts.find((c) => c.id === cartId);
            if (!cart) {
                throw new Error("Carrito no encontrado");
            }
            return cart;
        } catch (error) {
            throw error;
        }
    }

    // Metodo para guardar los carritos
    async saveCarts(carts) {
        try {
            await fs.promises.writeFile(this.pathFile, JSON.stringify(carts, null, '\t'));
        } catch (error) {
            throw error;
        }
    }
    
}
