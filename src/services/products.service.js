import { productsDao } from "../dao/factory.js"

export class ProductService{

    static getProducts = () =>{
        return productsDao.getProducts();
    };

    static createProducts = (productInfo) =>{
        return productsDao.createProduct(productInfo);
    };

    static getProductById = (productId) =>{
        return productsDao.getProductById(productId);
    };

    static updateProduct = (productId, newProductInfo) =>{
        return productsDao.updateProduct(productId, newProductInfo);
    };

    static deleteProduct = (productId) =>{
        return productsDao.deleteProduct(productId);
    };

    static getProductsPaginate = (query,options) => {
        return productsDao.getProductsPaginate(query,options);
    }
}