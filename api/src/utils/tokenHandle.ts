import * as jwt from 'jsonwebtoken';

const key = process.env.SECRET_KEY;

export const generateToken = (
  payload: { email: string, username: string }) => jwt.sign(payload, key as string);

export const validateToken = (token: string): Promise<Error | jwt.JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      key as string,
      (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded as jwt.JwtPayload);
        }
      });
  });
};
