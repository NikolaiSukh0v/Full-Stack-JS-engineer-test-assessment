import express from 'express';
import RecipeRoutes from './routes/RecipeRoutes';
import dotenv from 'dotenv';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
dotenv.config()
const base = process.env.FRONT_END_URL;
const app = express();
app.use(express.json());
app.use(
  cors({
     origin: base, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);
app.use('/recipes', RecipeRoutes);

app.use(errorHandler);

export default app;