import {faker} from "@faker-js/faker";

const { database, commerce, random, image, datatype } = faker;

export const generateProduct = () =>{
    return{
        id: database.mongodbObjectId(),
        title: commerce.product(),
        price: parseFloat(commerce.price()),
        stock: parseInt(random.numeric(2)),
        thumbnails: image.imageUrl(),
        code: random.alphaNumeric(5),  
        description: commerce.productDescription(),
        category: commerce.department(),
        status: datatype.boolean()
    }
}
