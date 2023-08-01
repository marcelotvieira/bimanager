import { ApiError } from '../../../Error/ApiError';
import { prisma } from '../../../prisma/prisma';

export class UserService {
  private _userModel = prisma.user;

  public async get() {
    return await this._userModel.findMany(
      {
        select: {
          id: true,
          email: true,
          username: true,
          isRandomPassword: true,
          databases: true
        }
      }
    );
  }

  public async authenticate(userName: string) {
    const user = await this._userModel.findFirst({
      where: {
        OR: [
          {
            email: userName
          },
          {
            username: userName
          }
        ]
      },
      select: {
        id: true,
        email: true,
        username: true,
        isRandomPassword: true,
        databases: true
      }
    });
    
    if (!user) return ApiError.notFound('User not found');

    return user;
  }
}