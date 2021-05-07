import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../config/config';

const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const authHeader = req.headers['authorization'];
  console.log('authHeader', authHeader)

  const token = authHeader && authHeader.split(' ')[1];
  console.log('token', token)

  if (token == null) return res.sendStatus(401);

  const decoded = await jwt.verify(
    token,
    config.jwtSecret as string,
    (err: any, decoded): void | any => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }

      console.log(`token ${token} is valid`);
      return decoded;
    }
  );

  req.body.token = token;
  req.body.user = decoded;

  next();
};

export default authenticateToken;
