import { config } from "../config/config.js";
import jwt from "jsonwebtoken";
import { transporter } from "../config/gmail.js";
import { logger } from "./logger.js";

export const generateEmailToken = (email,expireTime) =>{
    const token = jwt.sign({email},config.gmail.secretToken,{expiresIn:expireTime})
    return token
};

export const sendChangePasswordEmail = async(req,userEmail,token) =>{
    const domain = `${req.protocol}://${req.get('host')}`;
    const link = `${domain}/reset-password?token=${token}`;

    await transporter.sendMail({
        from:"DREAMWEAVERSTYLES",
        to: userEmail,
        subject: "Restanlecer contraseña",
        html:`
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; text-align: center;">
            <h2 style="color: #55595c;">Restablecimiento de Contraseña</h2>
            <p>Has recibido este correo electrónico porque has olvidado tu contraseña de DREAMWEAVERSTYLES. Si piensas que has recibido este correo electrónico por equivocación, contacta con nosotros a través de nuestro sitio web.</p>
            <p>Ya no podrás iniciar sesión en tu cuenta con la contraseña antigua. Para restablecer la contraseña, haz clic en el siguiente botón y sigue las instrucciones:</p>
            <p style="margin-top: 20px;">
                <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color:  #1a1a1a; color: #fff; text-decoration: none; border-radius: 5px;">Restablecer Contraseña</a>
            </p>
            <p>Este botón caducará dentro de 1 hora. Si deja de funcionar, utiliza el enlace "¿Has olvidado tu contraseña?" de la página de inicio de sesión para volver a enviar este correo electrónico.</p>
            <p>¡Gracias por visitar DREAMWEAVERSTYLES!</p>
            <p style="font-style: italic;">Saludos,<br>The DREAMWEAVERSTYLES Team</p>
            </div>
            `
    });
};

export const sendAccountDeletionEmail = async (userEmail) => {
    try {
        await transporter.sendMail({
            from: "DREAMWEAVERSTYLES",
            to: userEmail,
            subject: "Eliminación de cuenta por inactividad",
            html: `
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; text-align: center;">
                    <h2 style="color: #55595c;">Eliminación de Cuenta por Inactividad</h2>
                    <p>Tu cuenta en DREAMWEAVERSTYLES ha sido eliminada debido a inactividad.</p>
                    <p>Si no solicitaste la eliminación de tu cuenta o deseas recuperarla, por favor contacta con nosotros a través de nuestro sitio web.</p>
                    <p>¡Gracias por tu comprensión!</p>
                    <p style="font-style: italic;">Saludos,<br>The DREAMWEAVERSTYLES Team</p>
                </div>
            `
        });

        logger.informativo(`Correo electrónico de eliminación de cuenta enviado a ${userEmail}`);
    } catch (error) {
        logger.error(`Error al enviar el correo electrónico de eliminación de cuenta a ${userEmail}: ${error.message}`);
        throw new Error(`Error al enviar el correo electrónico de eliminación de cuenta: ${error.message}`);
    }
};

export const sendProductDeletionEmail = async (userEmail, productName) => {
    try {
        await transporter.sendMail({
            from: "DREAMWEAVERSTYLES",
            to: userEmail,
            subject: "Eliminación de Producto",
            html: `
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; text-align: center;">
                    <h2 style="color: #55595c;">Producto Eliminado</h2>
                    <p>El producto "${productName}" en DREAMWEAVERSTYLES ha sido eliminado.</p>
                    <p>Si no solicitaste la eliminación de este producto o tienes alguna pregunta, por favor contacta con nosotros a través de nuestro sitio web.</p>
                    <p>¡Gracias por tu comprensión!</p>
                    <p style="font-style: italic;">Saludos,<br>The DREAMWEAVERSTYLES Team</p>
                </div>
            `
        });

        logger.informativo(`Correo electrónico de eliminación de producto enviado a ${userEmail}`);
    } catch (error) {
        logger.error(`Error al enviar el correo electrónico de eliminación de producto a ${userEmail}: ${error.message}`);
        throw new Error(`Error al enviar el correo electrónico de eliminación de producto: ${error.message}`);
    }
};



export const verifyEmailToken = (token) =>{
    try {
        const info = jwt.verify(token, config.gmail.secretToken);
        return info.email
    } catch (error) {
        logger.error(error.message);
        return null;
    }
}
