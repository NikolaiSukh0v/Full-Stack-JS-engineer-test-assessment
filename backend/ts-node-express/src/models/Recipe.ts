// File: models/RecipeModel.ts

import axios from 'axios';

const RECIPE_API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

interface RecipeFilters {
  ingredient?: string;
  country?: string;
  category?: string;
}

interface LookupResponse {
  meals: Array<{
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags: string | null;
    strYoutube: string | null;
    strSource: string | null;
  }> | null;
}

class RecipeModel {
  static async fetchRecipes(filters: RecipeFilters) {
    const { ingredient, country, category } = filters;
    let apiEndpoint = '';

    if (ingredient) {
      apiEndpoint = `${RECIPE_API_BASE_URL}/filter.php?i=${ingredient}`;
    } else if (country) {
      apiEndpoint = `${RECIPE_API_BASE_URL}/filter.php?a=${country}`;
    } else if (category) {
      apiEndpoint = `${RECIPE_API_BASE_URL}/filter.php?c=${category}`;
    } else {
      apiEndpoint = `${RECIPE_API_BASE_URL}/search.php?s=`;
    }

    const response = await axios.get(apiEndpoint);
    return response.data;
  }



}

export default RecipeModel;
