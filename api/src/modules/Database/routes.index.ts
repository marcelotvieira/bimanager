import { Request, Response, Router } from 'express';
import * as asyncHandler from 'express-async-handler';
import { DatabaseController } from './controllers';
import { DatabaseService } from './services';

const databaseRouter = Router();

const databaseController = new DatabaseController(new DatabaseService());

databaseRouter.post(
  '/connection/register',
  asyncHandler((req: Request, res: Response) => databaseController.create(req, res))
);

databaseRouter.put(
  '/connection/:id',
  asyncHandler((req: Request, res: Response) => databaseController.update(req, res))
);

export default databaseRouter;