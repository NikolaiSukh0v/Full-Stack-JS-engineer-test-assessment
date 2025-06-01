// File: app/recipes/[idMeal]/layout.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface RecipeDetailLayoutProps {
  children: React.ReactNode;
  params: Promise<{ idMeal: string }>;
}

export default function RecipeDetailLayout({
  children,
  params,
}: RecipeDetailLayoutProps) {
  // Unwrap the params promise:
  const { idMeal } = React.use(params);

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
      {/* ← Back to all recipes */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Button component={Link} href="/recipes" variant="text">
          ← Back to Recipes
        </Button>
        <Typography variant="h6" component="h2" sx={{ ml: 2, fontWeight: 500 }}>
          Recipe ID: {idMeal}
        </Typography>
      </Box>

      {/* {children} will be your page.tsx output */}
      {children}
    </Box>
  );
}
