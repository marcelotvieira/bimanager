import { UserJwtPayload } from './userJwtPayload';

export { };

declare global {
  namespace Express {
    export interface Request {
      user: UserJwtPayload
    }
  }
}