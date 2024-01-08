import { app } from "../src/app.js";
import { expect } from "chai";
import supertest from "supertest";
import { usersModel } from "../src/dao/managers/mongo/models/users.model.js";
import { productsModel } from "../src/dao/managers/mongo/models/products.model.js";

const requester = supertest(app);

describe("Testing Product Routes", function () {
    let userCookie; 

    before(async function () {
        await usersModel.deleteMany({});
        await productsModel.deleteMany({});
    });

    it("Endpoint para el registro de un nuevo usuario o cliente, metodo POST", async function () {
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

    it("Endpoint para el logueo de session del usuario y generacion de cookie, metodo POST", async function () {
        const loginCredentials = {
            email: "pepe@coder.com",
            password: "coder"
        };
        const response = await requester.post("/api/sessions/login").send(loginCredentials);
        expect(response.body).to.not.have.property("error");
        userCookie = response.header["set-cookie"];
        expect(userCookie).to.exist;
    });

    it("Endpoint que muestre todos los productos, metodo GET", async function () {
        const response = await requester.get("/api/products").set("Cookie", userCookie);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("status").equal("success");
        expect(response.body).to.have.property("data").that.is.an("array");
    });

    let createdProductId; 

    it("Endpoint para crear un producto, debe estar logueado antes, metodo POST", async function () {
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

    it("Endpoint para devolver un producto por su ID, metodo GET", async function () {
        const response = await requester.get(`/api/products/${createdProductId}`).set("Cookie", userCookie);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("status").equal("success");
        expect(response.body).to.have.property("data");
        expect(response.body.data).to.have.property("_id").equal(createdProductId);
    });

    it("Endpoint para actualizar un producto por su ID, metodo PUT", async function () {
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
        expect(response.body).to.have.property("status").equal("success");
        expect(response.body).to.have.property("data");
        expect(response.body.data).to.have.property("_id").equal(createdProductId);
    });

    it("Endpoint para la eliminacion de un producto mediante su ID, metodo DELETE", async function () {
        const response = await requester.delete(`/api/products/${createdProductId}`).set("Cookie", userCookie);
        expect(response.body).to.have.property("status").equal("success");
        expect(response.body).to.have.property("message").equal("producto eliminado");
    });
});








