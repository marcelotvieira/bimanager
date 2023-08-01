import * as jwt from 'jsonwebtoken';

const key = process.env.SECRET_KEY;

const generateToken = (
  payload: { email: string, username: string }) => jwt.sign(payload, key as string);


export default generateToken;