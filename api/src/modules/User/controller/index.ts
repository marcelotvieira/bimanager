import { Request, Response } from 'express';
import { UserService } from '../services';

export class UserController {
  private _service: UserService;

  constructor(service: UserService) {
    this._service = service;
  }

  public async create(req: Request, res: Response): Promise<void> {
    const newUser = await this._service.create(req.body);
    res.status(200).json(newUser);
  }
  public async authenticate(req: Request, res: Response) {
    const user = await this._service.authenticate(req.body);
    res.status(200).json(user);
  }

  public async getUserConnections(req: Request, res: Response) {
    const user = await this._service.getUserConnections(req.params.id);
    res.status(200).json(user);
  }
  
}