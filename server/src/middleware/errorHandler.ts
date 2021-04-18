import { Request, Response } from 'express';

const errorHandler = (_req: Request, res: Response) => {
  const error = new Error('Not found');

  res.status(404).json({
    message: error.message,
  });
};

export default errorHandler;
