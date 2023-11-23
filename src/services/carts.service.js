import { cartsDao } from "../dao/factory.js"

export class CartService{

    static getCarts = () =>{
        return cartsDao.getCarts();
    };

    static createCart = () =>{
        return cartsDao.createCart();
    };

    static getCartById = (cartId) =>{
        return cartsDao.getCartById(cartId);
    };

    static addProduct = (cartId, productId) =>{
        return cartsDao.addProduct(cartId, productId);
    };

    static deleteProduct = (cartId, productId) =>{
        return cartsDao.deleteProduct(cartId, productId);
    };

    static updateProductCart = (cartId, productId, newQuantity) =>{
        return cartsDao.updateProductCart(cartId, productId, newQuantity);
    };

    static deleteCart = (cartId) =>{
        return cartsDao.deleteCart(cartId);
    };
}