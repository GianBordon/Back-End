import { app } from "../src/app.js";
import { expect } from "chai";
import supertest from "supertest";
import { usersModel } from "../src/dao/managers/mongo/models/users.model.js";
import { productsModel } from "../src/dao/managers/mongo/models/products.model.js";

const requester = supertest(app);

describe("Testing Product Routes", function () {
    let userCookie; // Variable para almacenar la cookie de la sesión

    before(async function () {
        await usersModel.deleteMany({});
        await productsModel.deleteMany({});
    });

    it("should register a user successfully", async function () {
        const mockUser = {
            first_name: "Pepe",
            last_name: "Perez",
            age: 25,
            email: "pepe@coder.com",
            password: "coder"
        };

        const response = await requester.post("/api/sessions/signup").send(mockUser);
        expect(response.body).to.not.have.property("error");
    });

    it("should log in a user and store the session cookie", async function () {
        const loginCredentials = {
            email: "pepe@coder.com",
            password: "coder"
        };

        const response = await requester.post("/api/sessions/login").send(loginCredentials);
        expect(response.body).to.not.have.property("error");

        // Almacena la cookie de la sesión para usarla en solicitudes posteriores
        userCookie = response.header["set-cookie"];
        expect(userCookie).to.exist;
    });

    it("GET /api/products should return a list of products", async function () {
        const response = await requester.get("/api/products").set("Cookie", userCookie);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("status").equal("success");
        expect(response.body).to.have.property("data").that.is.an("array");
    });

    let createdProductId; // Variable para almacenar el ID del producto creado

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

    console.log("Response Body (Create Product):", response.body);

    expect(response.body).to.have.property("status").equal("success");
    expect(response.body).to.have.property("result");
    expect(response.body.result).to.have.property("_id");
    
    // Almacenar el ID del producto creado para usarlo en otras pruebas
    createdProductId = response.body.result._id;
});

it("GET /api/products/:productId should return a product by ID", async function () {
    const response = await requester.get(`/api/products/${createdProductId}`).set("Cookie", userCookie);

    console.log("Response Body (Get Product by ID):", response.body);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("status").equal("success");
    expect(response.body).to.have.property("data");
    expect(response.body.data).to.have.property("_id").equal(createdProductId);
});

it("PUT /api/products/:productId should update a product by ID", async function () {
    const updatedProductData = {
        title: "Nuevo Sweater de Lana",
        description: "Sweater abrigador para días más fríos",
        price: 59.99,
        code: "S005",
        category: "Sweater",
        stock: 15,
    };

    const response = await requester.put(`/api/products/${createdProductId}`)
        .set("Cookie", userCookie)
        .send(updatedProductData);

    console.log("Response Body (Update Product):", response.body);

    expect(response.body).to.have.property("status").equal("success");
    expect(response.body).to.have.property("data");
    expect(response.body.data).to.have.property("_id").equal(createdProductId);
});

it("DELETE /api/products/:productId should delete a product by ID", async function () {
    const response = await requester.delete(`/api/products/${createdProductId}`).set("Cookie", userCookie);

    console.log("Response Body (Delete Product):", response.body);

    expect(response.body).to.have.property("status").equal("success");
    expect(response.body).to.have.property("message").equal("producto eliminado");
});
});








