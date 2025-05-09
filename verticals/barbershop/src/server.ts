import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import routes from './routes';

dotenv.config();
const app = express();
app.use(express.json());
app.use('/v1', routes);

const start = async () => {
  await connectDB(process.env.MONGO_URI!);
  app.listen(process.env.PORT || 4100, () =>
    console.log(`Agenda up on ${process.env.PORT || 4100}`)
  );
};
start();
