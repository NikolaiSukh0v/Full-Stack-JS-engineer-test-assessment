// app/recipes/[idMeal]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Typography,
  List,
  ListItemButton,
  Divider,
} from '@mui/material';

interface RawMeal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  [key: string]: any;
}

interface LookupResponse {
  meals: RawMeal[] | null;
}

interface RawMealSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface MealsResponse {
  meals: RawMealSummary[] | null;
}

interface Ingredient {
  name: string;
  measure: string;
}

interface Recipe {
  id: string;
  name: string;
  category: string;
  country: string;
  instructions: string;
  imageUrl: string;
  ingredients: Ingredient[];
}

const BACKEND_BASE = process.env.NEXT_PUBLIC_BACKEND_BASE || '';


function normalize(raw: RawMeal): Recipe {
  const ingredients: Ingredient[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;
    const name = raw[ingKey]?.trim();
    const measure = raw[measureKey]?.trim() || '';
    if (name) {
      ingredients.push({ name, measure });
    }
  }
  return {
    id: raw.idMeal,
    name: raw.strMeal,
    category: raw.strCategory,
    country: raw.strArea,
    instructions: raw.strInstructions,
    imageUrl: raw.strMealThumb,
    ingredients,
  };
}

export default function RecipeInfoPage() {
  const params = useParams();
  const idMeal = params?.idMeal as string;
  const router = useRouter();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [related, setRelated] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idMeal) return;

    async function load() {
      try {

        const res = await fetch(`${BACKEND_BASE}/recipes/${idMeal}`, { cache: 'no-store' });
        if (res.status === 404) {
          router.push('/404');
          return;
        }
        if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
        const data: LookupResponse = await res.json();
        if (!data.meals || data.meals.length === 0) {
          router.push('/404');
          return;
        }
        const main = normalize(data.meals[0]);
        setRecipe(main);


        const listRes = await fetch(
          `${BACKEND_BASE}/recipes?category=${encodeURIComponent(main.category)}`,
          { cache: 'no-store' }
        );
        if (!listRes.ok) throw new Error(`Category fetch failed (${listRes.status})`);
        const listData: MealsResponse = await listRes.json();
        if (!listData.meals) {
          setRelated([]);
        } else {

          const lookups = await Promise.all(
            listData.meals.map(async (item) => {
              const r = await fetch(`${BACKEND_BASE}/recipes/${item.idMeal}`, { cache: 'no-store' });
              if (!r.ok) return null;
              const json = (await r.json()) as LookupResponse;
              return json.meals && json.meals[0] ? normalize(json.meals[0]) : null;
            })
          );
          const filtered = lookups.filter((x): x is Recipe => x !== null && x.id !== main.id);
          setRelated(filtered);
        }
      } catch (err: any) {
        setError(err.message || 'Unexpected error');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [idMeal, router]);

  if (loading) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography>Loading…</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  if (!recipe) return null; 

  return (
    <Box sx={{ display: 'flex', p: 2 }}>

      <Box sx={{ flex: 1, pr: 2 }}>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Box
            component="img"
            src={recipe.imageUrl}
            alt={recipe.name}
            sx={{ width: 180, height: 180, borderRadius: 1, objectFit: 'cover', mr: 2 }}
          />
          <Box sx={{ textAlign: 'center', flex: 1 }}>
            <Typography variant="h4" gutterBottom>
              {recipe.name}
            </Typography>
            <Link href={`/recipes?country=${encodeURIComponent(recipe.country)}`}>
              <Typography
                component="a"
                variant="subtitle1"
                color="primary"
                sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                {recipe.country}
              </Typography>
            </Link>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />


        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Instructions
          </Typography>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{recipe.instructions}</Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

 
        <Box>
          <Typography variant="h5" gutterBottom textAlign="center">
            Ingredients
          </Typography>
          <List>
            {recipe.ingredients.map((ing) => (
              <ListItemButton
                key={ing.name}
                component={Link}
                href={`/recipes?ingredient=${encodeURIComponent(ing.name)}`}
              >
                <Typography>
                  {ing.name} {ing.measure && `(${ing.measure})`}
                </Typography>
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Box>

      <Divider orientation="vertical" flexItem />

      {/* Right sidebar: related by category */}
      <Box sx={{ width: 240, pl: 2 }}>
        <Typography variant="h6" gutterBottom>
          More in {recipe.category}
        </Typography>
        <List>
          {related.map((r) => (
            <ListItemButton key={r.id} component={Link} href={`/recipes/${r.id}`}>
              <Typography>{r.name}</Typography>
            </ListItemButton>
          ))}
        </List>
        <Box sx={{ mt: 2 }}>
          <Link href={`/recipes?category=${encodeURIComponent(recipe.category)}`}>
            <Typography
              component="a"
              variant="button"
              sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              View All {recipe.category}
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
