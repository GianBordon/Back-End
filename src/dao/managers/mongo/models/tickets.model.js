import mongoose from "mongoose";

const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema({
    code:{type:String, required:true},
    purchase_datetime:{type:Date},
    amount:{type:Number, required:true},
    purchaser:{tytpe:String, required:true}
})

export const ticketsModel = mongoose.model(ticketCollection, ticketSchema)