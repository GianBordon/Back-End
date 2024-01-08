import { app } from "../src/app.js";
import { expect } from "chai";
import supertest from "supertest";
import {usersModel} from "../src/dao/managers/mongo/models/users.model.js";

const requester = supertest(app);

describe("Testing Session Module", function () {
    let cookie;

    before(async function () {
        await usersModel.deleteMany({});
    });

    it("Endpoint para el registro de un nuevo usuario o cliente, metodo POST", async function () {
        const mockUser = {
            first_name: "Juan",
            last_name: "Perez",
            age:25,
            email: "pepes@gmail.com",
            password: "coder"
        };
        const response = await requester.post("/api/sessions/signup").send(mockUser);
        expect(response.body).to.not.have.property("error");
    });

    it("Endpoint para el logueo de session del usuario y generacion de cookie, metodo POST", async function () {
        const loginCredentials = {
            email: "pepes@gmail.com",
            password: "coder"
        };
        const response = await requester.post("/api/sessions/login").send(loginCredentials);
        expect(response.body).to.not.have.property("error");
        cookie = response.header["set-cookie"];
        expect(cookie).to.exist;
    });

    it("Endpoint para el cierre de session del usuario finalizando consigo la session de la cookie, metodo GET", async function () {
        const response = await requester.get("/api/sessions/logout").set("Cookie", cookie);
        expect(response.body).to.not.have.property("error");
    });
});

