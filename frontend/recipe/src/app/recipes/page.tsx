
import React from 'react';
import RecipeCard, { RecipeCardProps } from '../components/RecipeCard/index';

interface RawMealSummary {
  idMeal: string;
  strMeal: string;
  strMealAlternate: string | null;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null;
  strSource: string | null;
}

interface MealsResponse {
  meals: RawMealSummary[] | null;
}
const BACKEND_BASE = process.env.NEXT_PUBLIC_BACKEND_BASE || '';
async function fetchAllMeals(): Promise<RawMealSummary[]> {
  const res = await fetch(`${BACKEND_BASE}/recipes`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch recipes (status ${res.status})`);
  }
  const data: MealsResponse = await res.json();
  return data.meals || [];
}

export default async function RecipeListPage() {
  const meals = await fetchAllMeals();

  return (
    <div style={{ padding: '1rem' }}>
      <h2>All Recipes</h2>

      {meals.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          {meals.map((m) => {
            const cardProps: RecipeCardProps = {
              idMeal: m.idMeal,
              strMeal: m.strMeal,
              strMealAlternate: m.strMealAlternate,
              strCategory: m.strCategory,
              strArea: m.strArea,
              strMealThumb: m.strMealThumb,
              strTags: m.strTags,
              strYoutube: m.strYoutube,
              strSource: m.strSource,
            };


            return (
              <div key={m.idMeal} style={{ flex: '1 1 240px', maxWidth: '275px' }}>
                <RecipeCard {...cardProps} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
