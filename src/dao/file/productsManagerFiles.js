import fs from 'fs';

// Creo y exporto la clase con los metodos a utilzar en mis rutas
export class ProductsManagerFiles {
    constructor(path) {
        this.pathFile = path;
    }

    // Verifico si existe el archivo
    fileExists() {
        return fs.existsSync(this.pathFile);
    }

    // Metodo para crear un producto
    async createProduct(productInfo) {
        try {
        const products = await this.getProducts();

        // Validar si el producto ya existe por su código
        const existingProduct = products.find((p) => p.code === productInfo.code);
        if (existingProduct) {
            throw new Error('Ya existe un producto con el mismo código');
        }

        // Creo un ID unico y autoincrementable
        const newProductId = products.length === 0 ? 1 : products[products.length - 1].id + 1;

        const newProduct = {
            id: newProductId,
            ...productInfo,
        };

        products.push(newProduct);
        await this.saveProducts(products);
        return newProduct;
        } catch (error) {
        throw error;
        }
    }

    
    // Metodo para obtener todos los productos 
    async getProducts() {
        try {
            if (this.fileExists()) {
                const contenidoString = await fs.promises.readFile(this.pathFile, 'utf-8');
                const products = JSON.parse(contenidoString);
                return products;
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error al leer productos desde el archivo:', error); 
        }
    }

    // Metodo para obetner un producto segun su ID
    async getProductById(productId) {
        try {
            const products = await this.getProducts();
            const product = products.find((p) => p.id === productId);
    
            if (!product) {
                throw new Error('El producto no existe');
            }
    
            return product;
        } catch (error) {
            throw error;
        }
    }
    

    // Metodo para actualizar un producto segun su ID
    async updateProduct(updatedProduct) {
        try {
        const products = await this.getProducts();
        const existingProductIndex = products.findIndex((p) => p.id === updatedProduct.id);

        if (existingProductIndex === -1) {
            throw new Error('El producto no existe');
        }

        products[existingProductIndex] = updatedProduct;
        await this.saveProducts(products);
        return updatedProduct;
        } catch (error) {
        throw error;
        }
    }

    // Metodo para borrar algun producto segun su ID 
    async deleteProduct(productId) {
        try {
        const products = await this.getProducts();
        const existingProductIndex = products.findIndex((p) => p.id === productId);

        if (existingProductIndex === -1) {
            throw new Error('El producto no existe');
        }

        products.splice(existingProductIndex, 1);
        await this.saveProducts(products);
        } catch (error) {
        throw error;
        }
    }

    // Metodo para guardar los productos
    async saveProducts(products) {
        try {
        const contenido = JSON.stringify(products, null, 2);
        await fs.promises.writeFile(this.pathFile, contenido, 'utf-8');
        } catch (error) {
        throw error;
        }
    }
}

