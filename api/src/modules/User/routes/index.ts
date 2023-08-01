import { Request, Response, Router } from 'express';
import * as asyncHandler from 'express-async-handler';
import { UserController } from '../controller';
import { UserService } from '../services';


const userRouter = Router();

const userController = new UserController(new UserService());

userRouter.get(
  '/users',
  asyncHandler((req: Request, res: Response) => userController.get(req, res)),
);

userRouter.post(
  '/users/signin',
  asyncHandler((req: Request, res: Response) => userController.authenticate(req, res))
);

export default userRouter;
