import { ProductService } from "../services/products.service.js";
import { UserService } from "../services/users.service.js";
import { CartService } from "../services/carts.service.js";
import { ProfileDto } from "../dao/dto/profile.dto.js";
import { logger } from "../helpers/logger.js";

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
            logger.error("Error al recuperar los productos:", error);
            res.status(500).send("Error al recuperar los productos.");
        }
    };
    
    static showRemeras = async (req, res) => {
        try {
            const { limit = 12, page = 1, sort = 'asc', stock } = req.query;
            const query = { category: 'Remeras' }; 
            const sortOptions = {};
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
            logger.error("Error al recuperar los productos:", error);
            res.status(500).send("Error al recuperar los productos.");
        }
    };

    static showPantalones = async (req, res) => {
        try {
            const { limit = 12, page = 1, sort = 'asc', stock } = req.query;
            const query = { category: 'Pantalones' }; 
            const sortOptions = {};
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
            logger.error("Error al recuperar los productos:", error);
            res.status(500).send("Error al recuperar los productos.");
        }
    };

    static showBuzos = async (req, res) => {
        try {
            const { limit = 12, page = 1, sort = 'asc', stock } = req.query;
            const query = { category: 'Buzos' }; 
            const sortOptions = {};
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
            logger.error("Error al recuperar los productos:", error);
            res.status(500).send("Error al recuperar los productos.");
        }
    };

    static showSweater = async (req, res) => {
        try {
            const { limit = 12, page = 1, sort = 'asc', stock } = req.query;
            const query = { category: 'Sweater' }; 
            const sortOptions = {};
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
            logger.error("Error al recuperar los productos:", error);
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
            logger.error('Error al obtener los detalles del producto:', error);
            res.status(500).json({ status: 'error', message: 'Error al obtener los detalles del producto.' });
        }
    };
    
    static getProducts = async (req, res) => {
        try {
            const style = "loginView.css";
            res.render("loginView", {style});
        } catch (error) {
            logger.error("Error al recuperar los productos:", error);
            res.status(500).send("Error al recuperar los productos.");
        }
    };

    static singUp = (req,res)=>{
        const style = "signupView.css";
        res.render("signupView", {style});
    };
    
    static profile = (req,res)=>{
        try {
            if (req.user?.email) {
                const userInfo = req.user;
                const profileDto = new ProfileDto(userInfo);
                res.render("profileView", { profile: profileDto });
            } else {
                res.redirect("/loginView");
            }
        } catch (error) {
            logger.error("Error al obtener y procesar el perfil:", error);
            res.status(500).render("errorView", { error: "Error al obtener el perfil del usuario" });
        }
    };

    static testLogger =  (req,res)=>{
        logger.error("log error");
        logger.advertencia("log advertencia");
        logger.debbug("log debbug");
        res.send("prueba logger");
    };
    
    static forgotPassword = (req,res)=>{
        res.render("forgotPassView")
    }

    static resetPassword = (req, res)=>{
        const token = req.query.token;
        res.render("resetPassView",{token})
    }

    static showUsers = async (req, res) => {
        try {
            const users = await UserService.getAllUsers();
            const isAdmin = req.session.role === 'admin'; // Verificar si el usuario es administrador
            res.cookie('isAdmin', isAdmin); // Establecer una cookie con el rol del usuario
            res.render("users", { users });
        } catch (error) {
            logger.error("Error al recuperar los usuarios:", error);
            res.status(500).send("Error al recuperar los usuarios.");
        }
    };
    
    static addProductToCart = async (req, res) => {
        try {
            const { cid: cartId, pid: productId } = req.params;
            await CartService.addProduct(cartId, productId);
            res.redirect(`/carts/${cartId}`);
        } catch (error) {
            logger.error("Error al agregar producto al carrito:", error);
            res.status(500).send("Error al agregar producto al carrito.");
        }
    };

    static removeProductFromCart = async (req, res) => {
        try {
            const { cid: cartId, pid: productId } = req.params;
            await CartService.deleteProduct(cartId, productId);
            res.redirect(`/carts/${cartId}`);
        } catch (error) {
            logger.error("Error al eliminar producto del carrito:", error);
            res.status(500).send("Error al eliminar producto del carrito.");
        }
    };

    static purchaseCart = async(req,res)=>{
        try {
            const { cid: cartId } = req.params;
            await CartService.purchaseCart(cartId);
            res.redirect(`/carts/${cartId}`);
        } catch (error) {
            logger.error("Error al realizar la compra:", error);
            res.status(500).send("Error al realizar la compra.");
        }
    };
}