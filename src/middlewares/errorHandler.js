import { EError } from "../enums/EError.js";
import { logger } from "../helpers/logger.js";

export const errorHandler = ( error, req,res,next) =>{
    logger.error("Codigo de error: ",error.code);
    switch (error.code) {
        case EError.DATABASE_ERROR:
            res.json({status:"error", error:error.cause});
            break;
        case EError.AUTH_ERROR:
            res.json({status:"error", error:error.cause});
            break;
        case EError.INVALID_BODY_JSON_ERROR:
            res.json({status:"error", error:error.cause});
            break;
        default:
            res.json({status:"error", error: error.message});
            break;
    }
}