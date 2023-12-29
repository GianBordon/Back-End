import { CartService } from "../services/carts.service.js";
import { ProductService } from "../services/products.service.js";
import { TicketService } from "../services/ticket.service.js";
import {v4 as uuidv4} from 'uuid';


export class CartsController {

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
            const cart = await CartService.getCartById(cartId);
            const product = await ProductService.getProductById(productId);
    
            // Verificar si el usuario es premium y si el producto le pertenece
            if (
                req.user.role === "premium" &&
                product.owner.toString() === req.user._id.toString()
            ) {
                return res.json({
                    status: "error",
                    message: "No puedes agregar tu propio producto al carrito como usuario premium.",
                });
            }
    
            const result = await CartService.addProduct(cartId, productId);
            res.json({ status: "success", result });
        } catch (error) {
            res.json({ error: error.message });
        }
    };
    

    static purchaseCart = async(req,res)=>{
        const ticketProducts = [];
        const rejectProducts = [];
        let totalAmount = 0;
        try {
            const {cid: cartId} = req.params;
            const cart = await CartService.getCartById(cartId);
            if(cart.products.length){
                for(let i=0;i<cart.products.length;i++){ 
                    const cartProduct = cart.products[i]
                    const productInfo = cartProduct.productId;
                    if(cartProduct.quantity <= productInfo.stock){
                        ticketProducts.push(cartProduct)
                    }else {
                        rejectProducts.push(cartProduct)
                    }
                };
                //console.log("ticketProducts", ticketProducts)
                //console.log("rejectProducts", rejectProducts)
                for (let i = 0; i < ticketProducts.length; i++) {
                    const cartProduct = ticketProducts[i];
                    const productInfo = cartProduct.productId;
                    totalAmount += cartProduct.quantity * productInfo.price;
                }
                const newTicket = {
                    code: uuidv4(),
                    purchase_datetime: new Date(),
                    amount: totalAmount,
                    purchaser:req.user.email
                };
                await TicketService.createTicket(newTicket);
                console.log("newTicket", newTicket)
            } else {
                res.json({status:"error",message:"El carrito esta vacio"})
            }
        } catch (error) {
            res.status(500).json({ error: 'Error al mostrar el ticket del carrito' });
        }
    }
}
