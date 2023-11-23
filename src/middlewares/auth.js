
export const checkRole = (roles) => {
    return (req, res, next) => {
        console.log(req.user);

        if (!req.user || !req.user.role) {
            res.json({ status: "error", message: "No tienes acceso (usuario no definido o sin rol)" });
        } else if (!roles.includes(req.user.role)) {
            res.json({ status: "error", message: "No tienes acceso" });
        } else {
            next();
        }
    };
};