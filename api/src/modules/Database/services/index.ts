
import { Prisma, Query } from '@prisma/client';
import { ApiError } from '../../../Error/ApiError';
import { prisma } from '../../../prisma/prisma';
import { Connection } from '../Connection/Connection';

export class DatabaseService {
  private _databaseModel = prisma.database;

  async create(data: Prisma.DatabaseCreateInput) {
    return this._databaseModel.create({ data });
  }

  private async get(id?: number) {
    const database = await this._databaseModel.findFirst({
      where: { id: id ? id : undefined },
      include: {
        queries: true,
      }
    });
    if (!database) ApiError.notFound('Database not found');
    return database;
  }

  public async getDatabaseData(id?: number) {
    const database = await this._databaseModel.findFirst({
      where: { id: id ? id : undefined },
      select: {
        id: true,
        name: true,
        queries: {
          select: {
            query: false,
            id: true,
            name: true,
            isCompatibleWithPeriod: true,
            chartXAxisKey: true,
            chartYAxisKey: true,
          }
        }
      }
    });
    if (!database) ApiError.notFound('Database not found');
    return database;
  }

  public async update(id: string, data: Prisma.DatabaseUpdateInput) {
    const newConnection = await this._databaseModel.update({
      where: { id: Number(id) },
      data: data
    });

    return newConnection;
  }

  public async connectAndExecute(
    connectionId: number,
    queryId: number,
    initialDate: string = new Date('2023-01-01').toISOString(),
    finalDate: string = new Date().toISOString()
  ) {
    console.log(initialDate);
    console.log(finalDate);
    const database = await this.get(connectionId);
    const connection = new Connection(database?.connection as string);
    const targetQuery = database?.queries.find((q: Query) => q.id === queryId)?.query;
    if (!targetQuery) return ApiError.badRequest('Conexão ou Consulta indisponível');
    const data = await connection.execute(targetQuery, [initialDate, finalDate]);
    connection.closeConnection();
    return data;
  }
}