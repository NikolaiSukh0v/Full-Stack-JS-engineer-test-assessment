// app/recipes/[idMeal]/error.tsx
'use client';

import React, { useEffect } from 'react';

export default function RecipeDetailError({ error }: { error: Error }) {
  useEffect(() => {
    console.error('[RecipeDetailError]', error);
  }, [error]);

  return (
    <div
      style={{
        padding: '2rem',
        textAlign: 'center',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <h1 style={{ color: '#c00' }}>Oops—something went wrong.</h1>
      <p>{error.message}</p>
      <p>Please try again or go back to the <a href="/recipes" style={{ color: '#0066cc' }}>list of recipes</a>.</p>
    </div>
  );
}
