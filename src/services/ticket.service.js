import { ticketsDao } from "../dao/factory.js";

export class TicketService{
    static createTicket = (ticketInfo) => {  
        return ticketsDao.createTicket(ticketInfo); 
    };
}