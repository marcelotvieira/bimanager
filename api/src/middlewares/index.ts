import { Request, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';
import { ApiError } from '../Error/ApiError';
import { validateToken } from '../utils/tokenHandle';

export const checkToken = async (req: Request, res: Response, next: NextFunction) => { 
  const { authorization } = req.headers;
  const isMatch = await validateToken(authorization as string);
  if (!isMatch) return ApiError.unauthorized('Unauthenticated');
  // req.user = isMatch as UserJwtPayload;
  next();
};