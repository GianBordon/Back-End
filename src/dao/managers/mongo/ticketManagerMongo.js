// En ticketsManagerMongo.js
import { ticketsModel } from "./models/tickets.model.js";

export class TicketsManagerMongo {
    constructor() {
        this.model = ticketsModel;
    }

    async createTicket(ticketInfo) {  
        try {
            const result = await this.model.create(ticketInfo);
            return result;
        } catch (error) {
            console.log("createTicket: ", error.message);
            throw new Error("Se produjo un error creando el ticket");
        }
    }
}