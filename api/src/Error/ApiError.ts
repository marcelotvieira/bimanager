import { StatusCodes } from 'http-status-codes';

export class ApiError extends Error {
  public message: string;
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }

  static notFound(message: string) {
    throw new ApiError(message, StatusCodes.NOT_FOUND);
  }

  static unauthorized(message: string) {
    throw new ApiError(message, StatusCodes.UNAUTHORIZED);
  }
    
  static unprocessable(message: string) {
    throw new ApiError(message, StatusCodes.UNPROCESSABLE_ENTITY);
  }
    
  static badRequest(message: string) {
    throw new ApiError(message, StatusCodes.BAD_REQUEST);
  }
}