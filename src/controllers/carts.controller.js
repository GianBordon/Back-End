import { CartService } from "../services/carts.service.js";

export class CartController {

    static getCarts = async(req,res)=>{
        try {
            const carts = await CartService.getCarts();
            res.json({data:carts});
        } catch (error) {
            res.json({error:error.message});
        }
    };

    static getCartById = async(req,res)=>{
        try {
            const cartId = req.params.cid;
            const cart = await CartService.getCartById(cartId);
            res.json({status:"success", data: cart});
        } catch (error) {
            res.json({error:error.message});
        }
    };

    static createCart = async(req,res)=>{
        try {
            const cartCreated = await CartService.createCart();
            res.json({status:"success",data: cartCreated});
        } catch (error) {
            res.json({status:"error",error:error.message});
        }
    };

    static deleteProductCart = async (req, res) => {
        try {
            const { cid:cartId, pid:productId } = req.params;
            const result = await CartService.deleteProduct(cartId, productId);
            res.json({ message: 'Producto eliminado del carrito', result });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
        };
    };

    static updateCart = async (req, res) => {
        const { cid:cartId } = req.params;
        const newProducts = req.body.products;
    
        try {
            const updatedCart = await CartService.addProduct(cartId, newProducts);
            res.json({ message: 'Carrito actualizado', cart: updatedCart });
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el carrito' });
        };
    };

    static updateQuantityCart = async (req, res) => {
        try {
            const {cid:cartId,pid:productId} = req.params;
            const {newQuantity} = req.body;
            const cart = await CartService.getCartById(cartId);
            const result = await CartService.updateProductCart(cartId,productId,newQuantity);
            res.json({status:"success", result});
        } catch (error) {
            res.json({error:error.message});
        }
        };

    static deleteProductsCart = async (req, res) => {
        try {
            const { cid:cartId } = req.params;
            const result = await CartService.deleteCart(cartId);
            res.json({ message: 'Carrito eliminado', result });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el carrito' });
        }
    };

    static addProductCart = async (req, res) => {
        try {
            const { cid: cartId, pid: productId } = req.params;
            await CartService.addProduct(cartId, productId, );
            res.json({ message: 'Producto agregado al carrito con éxito' });
        } catch (error) {
            res.status(500).json({ error: 'Error al agregar el producto al carrito' });
        };
    };
}
