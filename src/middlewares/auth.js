
export const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            res.json({ status: "error", message: "No tienes acceso (usuario no definido o sin rol)" });
        } else if (!roles.includes(req.user.role)) {
            res.json({ status: "error", message: "No tienes acceso" });
        } else {
            next();
        }
    };
};

export const isAuth = (req,res,next)=>{
    if(!req.user){
        return res.json({status:"error", message:"Debes Iniciar Sesion para realizar esta operacion"})
    }
    next();
}

