import { ticketsModel } from "./models/tickets.model.js";
import { logger } from "../../../helpers/logger.js";

export class TicketsManagerMongo {
    constructor() {
        // Inicializa el modelo de tickets
        this.model = ticketsModel;
    }

    // Método para crear un nuevo ticket
    async createTicket(ticketInfo) {
        try {
            // Crea un nuevo ticket en la base de datos
            const result = await this.model.create(ticketInfo);
            return result;
        } catch (error) {
            // Captura y maneja cualquier error que ocurra durante la creación del ticket
            logger.error("createTicket: ", error.message);
            throw new Error("Se produjo un error creando el ticket");
        }
    }
}
