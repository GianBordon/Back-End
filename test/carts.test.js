import { app } from "../src/app.js";
import { expect } from "chai";
import supertest from "supertest";
import { usersModel } from "../src/dao/managers/mongo/models/users.model.js";
import { productsModel } from "../src/dao/managers/mongo/models/products.model.js";

const requester = supertest(app);

describe("Testing Cart Routes", function () {
    let userCookie; 
    let createdProductId; 
    let createdCartId; 

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
    

    it("POST /api/carts/:cid/products/:pid should add a product to the cart", async function () {
        // Iniciar sesión y crear el primer producto
        const mockUser1 = {
            first_name: "John",
            last_name: "Doe",
            age: 30,
            email: "john.doe@example.com",
            password: "password123"
        };
    
        const response1 = await requester.post("/api/sessions/signup").send(mockUser1);
        expect(response1.body).to.not.have.property("error");
        const userCookie1 = response1.header["set-cookie"];
        expect(userCookie1).to.exist;
    
        const newProduct = {
            title: "Sweater de Lana",
            description: "Sweater abrigador para días fríos",
            price: 49.99,
            code: "S0054",
            category: "Sweater",
            stock: 20,
        };

        const response = await requester.post("/api/products").set("Cookie", userCookie).send(newProduct);
        expect(response.body).to.have.property("status").equal("success");
        expect(response.body).to.have.property("result");
        expect(response.body.result).to.have.property("_id");
        createdProductId = response.body.result._id;
    
        // Iniciar sesión con otro usuario y crear un carrito
        const mockUser2 = {
            first_name: "Jane",
            last_name: "Doe",
            age: 25,
            email: "jane.doe@example.com",
            password: "password456"
        };
    
        const response3 = await requester.post("/api/sessions/signup").send(mockUser2);
        expect(response3.body).to.not.have.property("error");
        const userCookie2 = response3.header["set-cookie"];
        expect(userCookie2).to.exist;
    
        const response4 = await requester.post("/api/carts").set("Cookie", userCookie2);
        expect(response4.body).to.have.property("status").equal("success");
        expect(response4.body).to.have.property("data").that.is.an("object");
        const createdCartId = response4.body.data._id;
    
        // Agregar el producto al carrito
        const response5 = await requester.post(`/api/carts/${createdCartId}/products/${createdProductId}`).set("Cookie", userCookie2);
        console.log("response5.body:", response5.body);
    
        expect(response5.body).to.have.property("status").equal("success");
        expect(response5.body).to.have.property("data").that.is.an("object");
        expect(response5.body.data).to.have.property("_id").equal(createdCartId);
    });
    
    

    
    
    it("GET /api/carts/:cid should return a cart by ID", async function () {
        const cartsResponse = await requester.get("/api/carts").set("Cookie", userCookie);
        const cartId = cartsResponse.body.data[0]._id; // Tomar el primer carrito de la respuesta
    
        const response = await requester.get(`/api/carts/${cartId}`).set("Cookie", userCookie);
    
        expect(response.body).to.have.property("status").equal("success");
        expect(response.body).to.have.property("data").that.is.an("object");
        expect(response.body.data).to.have.property("_id").equal(cartId);
    });
    

});