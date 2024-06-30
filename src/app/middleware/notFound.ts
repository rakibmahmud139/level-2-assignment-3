/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';

const notFound = async (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    success: false,
    message: `api not found ${req.originalUrl}`,
    error: '',
  });
};

export default notFound;
