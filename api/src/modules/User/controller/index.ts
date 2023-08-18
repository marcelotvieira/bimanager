import { Request, Response } from 'express';
import { ApiError } from '../../../Error/ApiError';
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
    // const { authorization } = req.headers;
    // const decodedUser = await validateToken(authorization);
    const user = await this._service.getUserConnections(req.params.id);
    res.status(200).json(user);
  }

  public async authenticateToken(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (!authorization) return ApiError.unauthorized('Unauthorized');
    const auth = await this._service.authenticateToken(authorization);
    res.status(200).json(auth);
  }
  
}