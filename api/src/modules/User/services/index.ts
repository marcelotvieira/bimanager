import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { ApiError } from '../../../Error/ApiError';
import { prisma } from '../../../prisma/prisma';
import { generateToken } from '../../../utils/tokenHandle';

interface UserAuthenticationData {
  username: string;
  password: string;
}

export class UserService {
  private _userModel = prisma.user;

  private _userDefaultSelect = {
    id: true,
    email: true,
    username: true,
    isRandomPassword: true,
    databases: {
      select: {
        id: true,
        name: true,
        connection: true,
        queries: true,
      }
    }
  };

  private async get(where?: Prisma.UserWhereInput) {
    return await this._userModel.findMany(
      {
        where,
        select: this._userDefaultSelect,
      }
    );
  }

  private async getOne(where?: Prisma.UserWhereInput) {
    return await this._userModel.findFirst({
      where,
      select: this._userDefaultSelect,
    });
  }

  public async getUserConnections(id: string) {
    const userData = await this.getOne({ id: Number(id) });
    return userData;
  }

  private async update(id: string, data: Prisma.UserUpdateInput) {
    return await this._userModel.update({
      where: { id: Number(id) },
      data
    });
  }

  private async activate(id: string) {
    return await this._userModel.update({
      where: { id: Number(id) },
      data: { isRandomPassword: false }
    });
  }

  public async create(payload: Prisma.UserCreateInput) {
    const password = await bcrypt.hash(payload.password, 10);
    const newUser = await this._userModel.create({ data: { ...payload, password } });
    const token = generateToken({ email: newUser.email, username: newUser.username, id: newUser.id });
    return { token };
  }

  public async authenticate(payload: UserAuthenticationData) {
    const user = await this._userModel.findFirst({
      where: { 
        OR: [
          { email: payload.username },
          { username: payload.username },
        ]
      }
    });

    if (!user) {
      return ApiError.notFound('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(payload.password, user.password,);
    if (!isMatch) {
      return ApiError.notFound('Invalid credentials');
    }

    const token = generateToken({ email: user.email, username: user.username, id: user.id});

    return { token, user: {
      id: user.id,
      username: user.username,
      email: user.email,
    } };

  }

}