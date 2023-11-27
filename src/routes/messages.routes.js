import { Router } from "express";
import { MessagerController } from "../controllers/messages.controller.js";


const router = Router();
// Ruta para mandar mensajes por Mail [Fuente GMAIL]
router.post("/send-mail", MessagerController.sendMessageByEmail)
// Ruta para mandar mensajes por SMS [Fuente Twilio]
router.post("/send-sms", MessagerController.sendMessageBySms)

export { router as messagesRouter };