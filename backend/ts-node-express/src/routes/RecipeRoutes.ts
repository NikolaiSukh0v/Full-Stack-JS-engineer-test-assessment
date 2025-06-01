

import { Router } from 'express';
import { getRecipes, getById } from '../controllers/RecipeController';

const router = Router();


router.get('/', (getRecipes));


router.get('/:id', (getById));

export default router;
