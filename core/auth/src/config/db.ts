// src/config/db.ts
import mongoose from 'mongoose';

export const connectDB = async (uri: string) => {
  await mongoose.connect(uri);
  console.log('Mongo connected');
};
