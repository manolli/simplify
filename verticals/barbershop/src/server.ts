import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import routes from './routes';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
)

app.use('/v1', routes);

const start = async () => {
  await connectDB(process.env.MONGO_URI!);
  app.listen(process.env.PORT || 4100, () =>
    console.log(`Agenda up on ${process.env.PORT || 4100}`)
  );
};
start();
