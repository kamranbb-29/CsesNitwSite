import {Request, Response, NextFunction} from "express";

export const requireAuth = (res: Response, req: Request, next: NextFunction) => {
    if(!req.session.userId){
        return res.status(401).json({
            message: "Authentication Required",
        });
    }

    next();
};

export const requireRole = (...allowedRoles: string[]) => {
    return(req: Request, res: Response, next: NextFunction) => {
        if(!req.session.userId){
            return res.status(401).json({
                message: "Authentication Required",
            })
        }
        

        if(!allowedRoles.includes(req.session.role!)){
            return res.status(403).json({
                message: "You do not have access to this page",
            });
        }

        next();
    };
};