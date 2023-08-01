import * as dotenv from 'dotenv';
import * as express from 'express';
import { errorHanlder } from './Error/errorHandler';
import databaseRouter from './modules/Database/routes';
import userRouter from './modules/User/routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.app.get('/', (_req, res) => res.json({ message: 'ok' }));
    this.routes();
    this.errorConfig();
  }

  private config(): void {
    this.app.use(express.json());
    dotenv.config();
  }

  private routes(): void {
    this.app.use(userRouter);
    this.app.use(databaseRouter);
  }

  private errorConfig(): void {
    this.app.use(errorHanlder);
  }
  
  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;