import { Request, Response, NextFunction } from 'express';
import Recipe  from '../models/Recipe';
import { log } from 'console';
import axios from 'axios'
import dotenv from'dotenv'
dotenv.config()
export const getRecipes = async (req: Request, res: Response) => {
  const { ingredient, country, category } = req.query;

  const filters = {
    ingredient: typeof ingredient === 'string' ? ingredient : undefined,
    country: typeof country === 'string' ? country : undefined,
    category: typeof category === 'string' ? category : undefined,
  };

  try {
    const recipes = await Recipe.fetchRecipes(filters);
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recipes', details: error });
  }
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ error: 'Recipe ID is required' });
      return;
    }

    const base = process.env.SEARCH_URL;
    if (!base) {
      res.status(500).json({ error: 'SEARCH_URL is not set' });
      return;
    }


    const response = await axios.get(`${base}=${id}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(`Error in getById (ID: ${req.params.id}):`, error);
    next(error);
  }
};
