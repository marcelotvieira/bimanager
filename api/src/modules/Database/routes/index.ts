import { Request, Response, Router } from 'express';
import * as asyncHandler from 'express-async-handler';
import { checkToken } from '../../../middlewares';
import { DatabaseController } from '../controllers';
import { DatabaseService } from '../services';

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

databaseRouter.get(
  '/connection/:id',
  asyncHandler(checkToken),
  asyncHandler((req: Request, res: Response) => databaseController.get(req, res))
);

databaseRouter.post(
  '/customer/get_data',
  asyncHandler((req: Request, res: Response) => databaseController.connectAndExecute(req, res))
);

export default databaseRouter;