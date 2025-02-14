import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function connect(_req: NextApiRequest, _res: NextApiResponse, next: any) {
  try {
    if(mongoose.connection.readyState) {
      next();
      return;
    };

    await mongoose.connect(
      process.env.MONGO_URL || '', 
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );

    console.log("Database is ready ", mongoose.connection.readyState);
    next();
  } catch (error) {
    console.log("Error connecting to database", error.message);
  }
};