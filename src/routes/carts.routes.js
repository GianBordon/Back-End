import { Router } from 'express';
import { cartsService } from '../dao/index.js';

const router = Router();

// Ruta para obtener todos los carritos
router.get("/", async(req,res)=>{
    try {
        const carts = await cartsService.getCarts();
        res.json({data:carts});
    } catch (error) {
        res.json({error:error.message});
    }
});
// Ruta para crear un nuevo carrito
router.post("/",async(req,res)=>{
    try {
        const cartCreated = await cartsService.createCart();
        res.json({status:"success",data: cartCreated});
    } catch (error) {
        res.json({status:"error",error:error.message});
    }
});
// Ruta para obtener los productos de un carrito
router.get("/:cid", async(req,res)=>{
    try {
        const cartId = req.params.cid;
        const cart = await cartsService.getCartById(cartId);
        res.json({status:"success", data: cart});
    } catch (error) {
        res.json({error:error.message});
    }
});
// Ruta para eliminar un producto del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid:cartId, pid:productId } = req.params;
        const result = await cartsService.deleteProduct(cartId, productId);
        res.json({ message: 'Producto eliminado del carrito', result });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
    };
});
// Ruta para actualizar el carrito con un arreglo de productos
router.put('/:cid', async (req, res) => {
    const { cid:cartId } = req.params;
    const newProducts = req.body.products;

    try {
        const updatedCart = await cartsService.addProduct(cartId, newProducts);
        res.json({ message: 'Carrito actualizado', cart: updatedCart });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el carrito' });
    };
});
// Ruta para actualizar la cantidad de un producto en el carrito
router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const {cid:cartId,pid:productId} = req.params;
        const {newQuantity} = req.body;
        const cart = await cartsService.getCartById(cartId);
        const result = await cartsService.updateProductCart(cartId,productId,newQuantity);
        res.json({status:"success", result});
    } catch (error) {
        res.json({error:error.message});
    }
    });
// Ruta para eliminar todos los productos del carrito
router.delete('/:cid', async (req, res) => {
    try {
        const { cid:cartId } = req.params;
        const result = await cartsService.deleteCart(cartId);
        res.json({ message: 'Carrito eliminado', result });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el carrito' });
    }
});
// Ruta para agregar un producto al carrito
router.post("/:cid/products/:pid", async (req, res) => {
    try {
        const { cid: cartId, pid: productId } = req.params;
        await cartsService.addProduct(cartId, productId, );
        res.json({ message: 'Producto agregado al carrito con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto al carrito' });
    };
});


export { router as cartsRouter };


