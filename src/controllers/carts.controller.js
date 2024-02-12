import { CartService } from "../services/carts.service.js";
import { TicketService } from "../services/ticket.service.js";
import { v4 as uuidv4 } from 'uuid';

export class CartsController {

    // Metodo para obtener todos los carritos
    static getCarts = async (req, res) => {
        try {
            const carts = await CartService.getCarts();
            res.json({ data: carts });
        } catch (error) {
            res.json({ error: error.message });
        }
    };

    // Metodo para crear un carrito
    static createCart = async (req, res) => {
        try {
            const cartCreated = await CartService.createCart();
            res.json({ status: "success", data: cartCreated });
        } catch (error) {
            res.json({ status: "error", error: error.message });
        }
    };

    // Metodo para obtener un carrito por su ID
    static getCartById = async (req, res) => {
        try {
            const cartId = req.params.cid;
            const cart = await CartService.getCartById(cartId);
            res.json({ status: "success", data: cart });
        } catch (error) {
            res.json({ error: error.message });
        }
    };

    // Metodo para eliminar un producto del carrito
    static deleteProductCart = async (req, res) => {
        try {
            const { cid:cartId, pid:productId } = req.params;
            const result = await CartService.deleteProduct(cartId, productId);
            res.json({ message: 'Producto eliminado del carrito', result });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
        }
    };
    

    // Método para actualizar la cantidad de un producto
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
    



    // Metodo para agregar un producto al carrito
    static addProductToCart = async (req, res) => {
        try {
            const { cid: cartId, pid: productId } = req.params;

            if (!cartId) {
                const newCart = await CartService.createCart();
                cartId = newCart._id;
                req.session.cartId = cartId;
            }

            const result = await CartService.addProduct(cartId, productId);
            res.json({ status: "success", result });
        } catch (error) {
            res.json({ error: error.message });
        }
    };

    static purchaseCart = async (req, res) => {
        const ticketProducts = [];
        const rejectProducts = [];
        let totalAmount = 0;
        try {
            const cartId = req.params.cartId;
            const cart = await CartService.getCartById(cartId);
            if (cart.products.length) {
                for (let i = 0; i < cart.products.length; i++) {
                    const cartProduct = cart.products[i];
                    const productInfo = cartProduct.productId;
                    if (cartProduct.quantity <= productInfo.stock) {
                        ticketProducts.push(cartProduct);
                    } else {
                        rejectProducts.push(cartProduct);
                    }
                }
                for (let i = 0; i < ticketProducts.length; i++) {
                    const cartProduct = ticketProducts[i];
                    const productInfo = cartProduct.productId;
                    totalAmount += cartProduct.quantity * productInfo.price;
                }
                const newTicket = {
                    code: uuidv4(),
                    purchase_datetime: new Date(),
                    amount: totalAmount,
                    purchaser: req.user.email
                };
                await TicketService.createTicket(newTicket);
                console.log("newTicket", newTicket);
            } else {
                res.json({ status: "error", message: "El carrito está vacío" });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error al mostrar el ticket del carrito' });
        }
    }
}
