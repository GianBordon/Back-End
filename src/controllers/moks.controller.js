import { generateProduct } from "../helpers/mock.js";

export class MockController{

    // Método para generar productos de forma aleatoria
    static generateProduct = (req,res)=>{
        try {
            // Obtener la cantidad de productos a generar del query params, si no se especifica, se generarán 100 productos por defecto
            const cant = parseInt(req.query.cant) || 100;
            let products = [];
            // Generar la cantidad especificada de productos
            for(let i=0;i<cant;i++){
                const newProduct = generateProduct();
                products.push(newProduct);
            };
            res.json({status:"success", data:products});
        } catch (error) {
            // En caso de error, devolver un mensaje de error con el estado 500
            res.status(500).json({status:"error", message:error.message});
        }
    };
}

