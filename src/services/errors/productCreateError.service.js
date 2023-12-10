export const productCreateError = (product) =>{
    return `Todos los campos son obligatorios, 
            Listado de campos obligatorios:
            title: Este campo debe ser de tipo string, y se recibio ${product.title},
            description: Este campo debe ser de tipo string, y se recibio ${product.description},
            price: Este campo debe ser de tipo numerico, y se recibio ${product.price},
            code: Este campo debe ser de tipo string, y se recibio ${product.code},
            category: Este campo debe ser de tipo string, y se recibio ${product.category},
            stock: Este campo debe ser de tipo numerico, y se recibio ${product.stock},`
}