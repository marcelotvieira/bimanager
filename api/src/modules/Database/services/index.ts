
import { Prisma } from '@prisma/client';
import { prisma } from '../../../prisma/prisma';

export class DatabaseService {
  private _databaseModel = prisma.database;

  async create(data: Prisma.DatabaseCreateInput) {
    return this._databaseModel.create({ data });
  }

  public async update(id: string, data: Prisma.DatabaseUpdateInput) {
    const newConnection = await this._databaseModel.update({
      where: { id: Number(id) },
      data: data
    });

    return newConnection;
  }
}