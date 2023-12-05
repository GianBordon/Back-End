import { generateProduct } from "../helpers/mock.js";

export class MockController{

    static generateProduct = (req,res)=>{
        try {
            const cant = parseInt(req.query.cant) || 100;
            let products = [];
                for(let i=0;i<cant;i++){
                    const newProduct = generateProduct();
                    products.push(newProduct);
                };
                res.json({status:"success", data:products});
        } catch (error) {
            res.status(500).json({status:"error", message:error.message});
        }
    };
}

