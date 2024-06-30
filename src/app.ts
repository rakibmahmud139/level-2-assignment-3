import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrorHandling';
import router from './app/routes';
import notFound from './app/middleware/notFound';

//middleware
app.use(express.json());
app.use(cors());

//application routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to my universe!',
  });
});

//global error handling
app.use(globalErrorHandler);

//not found
app.use(notFound);

export default app;
