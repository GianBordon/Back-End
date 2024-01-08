import { app } from "../src/app.js";
import { expect } from "chai";
import supertest from "supertest";
import { usersModel } from "../src/dao/managers/mongo/models/users.model.js";
import { productsModel } from "../src/dao/managers/mongo/models/products.model.js";

const requester = supertest(app);

describe("Testing Cart Routes", function () {
    let userCookie; // Variable para almacenar la cookie de la sesión
    let createdProductId; // Variable para almacenar el ID del producto creado
    let createdCartId; // Variable para almacenar el ID del carrito creado

    before(async function () {
        await usersModel.deleteMany({});
        await productsModel.deleteMany({});
    });

    it("should register a user successfully", async function () {
        const mockUser = {
            first_name: "John",
            last_name: "Doe",
            age: 30,
            email: "john.doe@example.com",
            password: "password123"
        };

        const response = await requester.post("/api/sessions/signup").send(mockUser);
        expect(response.body).to.not.have.property("error");
        userCookie = response.header["set-cookie"];
        expect(userCookie).to.exist;
    });

    it("should log in a user and store the session cookie", async function () {
        const loginCredentials = {
            email: "john.doe@example.com",
            password: "password123"
        };

        const response = await requester.post("/api/sessions/login").send(loginCredentials);
        expect(response.body).to.not.have.property("error");
        userCookie = response.header["set-cookie"];
        expect(userCookie).to.exist;
    });

    it("POST /api/products should create a new product", async function () {
        const newProduct = {
            title: "Sweater de Lana",
            description: "Sweater abrigador para días fríos",
            price: 49.99,
            code: "S004",
            category: "Sweater",
            stock: 20,
        };

        const response = await requester.post("/api/products").set("Cookie", userCookie).send(newProduct);
        expect(response.body).to.have.property("status").equal("success");
        expect(response.body).to.have.property("result");
        expect(response.body.result).to.have.property("_id");
        createdProductId = response.body.result._id;
    });

    it("should register another user successfully", async function () {
        const mockUser = {
            first_name: "Jane",
            last_name: "Doe",
            age: 25,
            email: "jane.doe@example.com",
            password: "password456"
        };
    
        const response = await requester.post("/api/sessions/signup").send(mockUser);
        expect(response.body).to.not.have.property("error");
        userCookie = response.header["set-cookie"];
        expect(userCookie).to.exist;
    });
    
    it("should log in the second user and store the session cookie", async function () {
        const loginCredentials = {
            email: "jane.doe@example.com",
            password: "password456"
        };
    
        const response = await requester.post("/api/sessions/login").send(loginCredentials);
        expect(response.body).to.not.have.property("error");
        userCookie = response.header["set-cookie"];
        expect(userCookie).to.exist;
    });

    it("POST /api/carts should create a new cart", async function () {
        const response = await requester.post("/api/carts").set("Cookie", userCookie);
    
        expect(response.body).to.have.property("status").equal("success");
        expect(response.body).to.have.property("data").that.is.an("object"); 
        expect(response.body.data).to.have.property("_id").that.is.a("string");
    });
    
    it("GET /api/carts should return all carts", async function () {
        // Crear un nuevo carrito adicional
        await requester.post("/api/carts").set("Cookie", userCookie);
    
        const response = await requester.get("/api/carts").set("Cookie", userCookie);
    
        expect(response.body).to.have.property("data").that.is.an("array");
        expect(response.body.data).to.have.length.at.least(1);
    });
    
    
    // ...

it("POST /api/carts/:cid/products/:pid should add a product to the cart", async function () {
    const cartsResponse = await requester.get("/api/carts").set("Cookie", userCookie);
    const cartId = cartsResponse.body.data[0]._id; // Tomar el primer carrito de la respuesta

    // Crear un nuevo producto para agregar al carrito
    const newProductResponse = await requester.post("/api/products").set("Cookie", userCookie).send({
        title: "Camiseta de algodón",
        description: "Camiseta cómoda para uso diario",
        price: 19.99,
        code: "C001",
        category: "Remeras",
        stock: 30,
    });

    const productId = newProductResponse.body.result._id;

    // Agregar el producto al carrito
    const addToCartResponse = await requester.post(`/api/carts/${cartId}/products/${productId}`).set("Cookie", userCookie);

    expect(addToCartResponse.body).to.have.property("status").equal("success");
    expect(addToCartResponse.body).to.have.property("data").that.is.an("object");
    expect(addToCartResponse.body.data).to.have.property("_id").equal(cartId);
});

// ...

    
    
    it("GET /api/carts/:cid should return a cart by ID", async function () {
        const cartsResponse = await requester.get("/api/carts").set("Cookie", userCookie);
        const cartId = cartsResponse.body.data[0]._id; // Tomar el primer carrito de la respuesta
    
        const response = await requester.get(`/api/carts/${cartId}`).set("Cookie", userCookie);
    
        expect(response.body).to.have.property("status").equal("success");
        expect(response.body).to.have.property("data").that.is.an("object");
        expect(response.body.data).to.have.property("_id").equal(cartId);
    });
    

});