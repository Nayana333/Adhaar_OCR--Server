import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import User from '../database/userModel';

interface RequestWithToken extends Request {
    token?: string;
    user?: any;
}

const protect = asyncHandler(async (req: RequestWithToken, res: Response, next: NextFunction) => {
    let token: string | undefined;
    
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(' ')[1];
            console.log(token);

            if (!token) {
                res.status(401).json({ message: 'Not authorized, no token' });
                return;
            }

            const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

            if (decoded.role !== "user") {
                res.status(401).json({ message: 'Not authorized' });
                return;
            }

            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                res.status(401).json({ message: 'User not found' });
                return;
            }

            if (req.user.isBlocked) {
                res.status(401).json({ message: 'User blocked' });
                return;
            }

            req.token = token;
            next();
        } catch (error: any) {
            console.log(error);
            if (error.name === "TokenExpiredError") {
                res.status(401).json({ message: "Token expired" });
            } else {
                res.status(401).json({ message: "Not authorized" });
            }
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
});

export { protect };
