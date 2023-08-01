import { Request, Response } from 'express';
import { UserService } from '../services';

export class UserController {
  private _service: UserService;

  constructor(service: UserService) {
    this._service = service;
  }

  public async get(req: Request, res: Response): Promise<void> {
    const rows = await this._service.get();
    res.status(200).json(rows);
  }
  public async authenticate(req: Request, res: Response) {
    const user = await this._service.authenticate(req.body.username);
    res.status(200).json(user);
  }
}