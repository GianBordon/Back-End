import { ProductService } from "../services/products.service.js"
import { CartService } from "../services/carts.service.js";

export class ViewsController{
    
    static showProducts = async (req, res) => {
        try {
            const { limit = 12, page = 1,sort = 'asc', category, stock} = req.query;
            const query = {};
            const sortOptions = {};
            
            if (category) {
                query.category = category;
            }
            if (stock) {
                query.stock = stock;
            }
            
            if (sort === 'asc') {
                sortOptions.price = 1; // Orden ascendente por precio
            } else if (sort === 'desc') {
                sortOptions.price = -1; // Orden descendente por precio
            } else {
                // Si el valor de `sort` no es válido, puedes establecer un valor predeterminado.
                sortOptions.price = 1;
            }
            
            const options = { limit,page,sort: sortOptions,lean: true};
            const result = await ProductService.getProductsPaginate(query,options);
            const baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
            const dataProducts = {
                status: "success",
                payload: result.docs,
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: result.hasPrevPage ? `${baseUrl.replace(`page=${result.page}`, `page=${result.prevPage}`)}` : null,
                nextLink: result.hasNextPage ? baseUrl.includes("page") ?
                baseUrl.replace(`page=${result.page}`, `page=${result.nextPage}`) : baseUrl.concat(`?page=${result.nextPage}`) : null
            };
            if (req.session.email) {
                dataProducts.userEmail = req.session.email;
                dataProducts.userRole = req.session.role;
                dataProducts.userName = req.session.first_name;
            }
            res.render("products", dataProducts);
        } catch (error) {
            console.error("Error al recuperar los productos:", error);
            res.status(500).send("Error al recuperar los productos.");
        }
    };
    
    static getDetailsProduct = async (req, res) => {
        try {
            const productId = req.params.productId; 
            const product = await ProductService.getProductById(productId);
            const style = "productsDetail.css"
            res.render('productsDetail', { product, style }); 
        } catch (error) {
            console.error('Error al obtener los detalles del producto:', error);
            res.status(500).json({ status: 'error', message: 'Error al obtener los detalles del producto.' });
        }
    };
    
    static getCart = async (req, res) => {
        try {
            const cartId = req.params.cid;
            const cart = await CartService.getCartById(cartId);
            const style = "carrito.css"
            res.render('carrito', { cart, style });
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
            res.status(500).send('Error al obtener el carrito.');
        }
    };
    
    static getProducts = async (req, res) => {
        try {
            const style = "loginView.css";
            res.render("loginView", {style});
        } catch (error) {
            console.error("Error al recuperar los productos:", error);
            res.status(500).send("Error al recuperar los productos.");
        }
    };

    static singUp = (req,res)=>{
        const style = "signupView.css";
        res.render("signupView", {style});
    };
    
    static profile = (req,res)=>{
        if(req.user?.email){
            const userEmail = req.user.email;
            const userRole = req.user.role;
            const userName = req.user.first_name;
            const userLast_Name = req.user.last_name;
            const userAge = req.user.age;
            res.render("profileView", { userEmail, userName, userRole, userAge, userLast_Name});
        } else {
            res.redirect("/loginView");
        }
    };
}