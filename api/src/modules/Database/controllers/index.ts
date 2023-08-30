import { Request, Response } from 'express';
import { ApiError } from '../../../Error/ApiError';
import { prisma } from '../../../prisma/prisma';
import { DatabaseService } from '../services';

export class DatabaseController {
  private _service: DatabaseService;

  constructor(service: DatabaseService) {
    this._service = service;
  }

  public async create(req: Request, res: Response) {
    const user = await prisma.user.findUnique({where: { id: req.body.ownerId}});
    if (!user) ApiError.notFound('User passed as owner does not exist');
    const newConnection  = await this._service.create(req.body);
    res.status(200).json({
      message: 'Connection created successfully',
      connection: newConnection
    });
  }

  public async update(req: Request, res: Response) {
    const newConnection = await this._service.update(req.params.id, req.body);
    res.status(200).json({
      message: 'Connection updated successfully',
      connection: newConnection
    });
  }

  public async get(req: Request, res: Response) {
    const connectionData = await this._service.getDatabaseData(Number(req.params.id));
    res.status(200).json(connectionData);
  }

  public async connectAndExecute(req: Request, res: Response) {
    const { connectionId, queryId, initialDate, finalDate } = req.body;
    const data = await this._service.connectAndExecute(connectionId, queryId, initialDate, finalDate);
    res.status(200).json(data);
  }

}