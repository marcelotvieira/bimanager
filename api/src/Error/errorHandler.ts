import { NextFunction, Request, Response } from 'express';
import { ApiError } from './ApiError';

export const errorHanlder = (
  error: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  if (error instanceof ApiError) {
    return res.status(400).json({ message: error.message });
  }
  return res.status(400).json({
    message: 'Unhandled Error',
    details: error.message
  });
};