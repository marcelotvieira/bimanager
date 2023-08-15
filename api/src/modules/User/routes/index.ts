import { Request, Response, Router } from 'express';
import * as asyncHandler from 'express-async-handler';
import { checkToken } from '../../../middlewares';
import { UserController } from '../controller';
import { UserService } from '../services';


const userRouter = Router();

const userController = new UserController(new UserService());

userRouter.post(
  '/users/register',
  asyncHandler((req: Request, res: Response) => userController.create(req, res)),
);


userRouter.post(
  '/users/signin',
  asyncHandler((req: Request, res: Response) => userController.authenticate(req, res))
);

userRouter.get(
  '/users/:id',
  asyncHandler(checkToken),
  asyncHandler((req: Request, res: Response) => userController.getUserConnections(req, res))
);

export default userRouter;
