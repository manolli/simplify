import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import authRouter from './routes/auth.routes';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/v1/auth', authRouter);

const start = async () => {
  await connectDB(process.env.MONGO_URI!);
  app.listen(process.env.PORT || 4000, () =>
    console.log(`Auth up on ${process.env.PORT || 4000}`)
  );
};
start();
