import { NextFunction, Request, Response } from 'express';

const setAccessHeaders = (
    req: Request,
    res: Response,
    next: NextFunction
): void | Response<any, Record<string, any>> => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
};

export default setAccessHeaders;
