import { ticketsModel } from "./models/tickets.model.js";
import { logger } from "../../../helpers/logger.js";

export class TicketsManagerMongo {
    constructor() {
        this.model = ticketsModel;
    }

    async createTicket(ticketInfo) {  
        try {
            const result = await this.model.create(ticketInfo);
            return result;
        } catch (error) {
            logger.error("createTicket: ", error.message);
            throw new Error("Se produjo un error creando el ticket");
        }
    }
}