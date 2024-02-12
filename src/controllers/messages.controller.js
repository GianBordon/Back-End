import { config } from "../config/config.js";
import { transporter } from "../config/gmail.js";
import path from "path";
import { __dirname } from "../utils.js"
import { twilioClient } from "../config/twilio.js";
import { logger } from "../helpers/logger.js";

export class MessagerController {

    // Método para enviar un mensaje por correo electrónico
    static sendMessageByEmail = async (req, res) => {
        const emailTemplate = `<div>
            <h1>Bienvenido!!</h1>
            <img src="https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/portals_3/2x1_SuperMarioHub.jpg" style="width:250px"/>
            <p>Ya puedes empezar a usar nuestros servicios</p>
            <a href="https://www.google.com/">Explorar</a>
            <img src="cid:TYC"/>
            </div>`;
        try {
            const result = await transporter.sendMail({
                from: config.gmail.account,
                to: "shiammdp21@gmail.com",
                subject: "Tu registro ha sido exitoso",
                html: emailTemplate,
                attachments:[
                    {
                        filename:"TYC.png",
                        path:path.join(__dirname,"/assets/img/TYC.png"),
                        cid:"TYC"
                    },
                    {
                        filename:"terminosYCondiciones.doc",
                        path:path.join(__dirname,"/assets/documnets/terminosYCondiciones.doc"),
                        cid:"terminos"
                    }
                ]
            });
            res.json({ status: "success", data: result });
        } catch (error) {
            logger.error(error);
            res.status(500).json({ status: "error", message: error.message });
        }
    }

    // Método para enviar un mensaje por SMS
    static sendMessageBySms = async(req,res)=>{
        try {
            const result = await twilioClient.messages.create({
                from:config.twilio.phone,
                to: process.env.USER_PHONE,
                body:"Su pedido fue realizado correctamente"
            });
            logger.info(result);
            res.json({status:"success", message:"Envio de mensaje exitoso"});
        } catch (error) {
            logger.error(error);
            res.json({status:"error", message:"Hubo un error al enviar el mensaje de texto"})
        }
    }
}
