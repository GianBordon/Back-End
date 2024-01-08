import { app } from "../src/app.js";
import { expect } from "chai";
import supertest from "supertest";
import {usersModel} from "../src/dao/managers/mongo/models/users.model.js";

const requester = supertest(app);

describe("Testing Session Module", function () {
    let cookie; // Variable para almacenar la cookie de la sesión

    before(async function () {
        await usersModel.deleteMany({});
    });

    it("should register a user successfully", async function () {
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

    it("should log in a user and store the session cookie", async function () {
        const loginCredentials = {
            email: "pepes@gmail.com",
            password: "coder"
        };

        const response = await requester.post("/api/sessions/login").send(loginCredentials);
        expect(response.body).to.not.have.property("error");

        // Almacena la cookie de la sesión para usarla en solicitudes posteriores
        cookie = response.header["set-cookie"];
        expect(cookie).to.exist;
    });

    it("should log out the user", async function () {
        const response = await requester.get("/api/sessions/logout").set("Cookie", cookie);
        expect(response.body).to.not.have.property("error");
    });
});

