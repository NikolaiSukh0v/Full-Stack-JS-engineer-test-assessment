'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export interface RecipeCardProps {

  idMeal: string;
  strMeal: string;
  strMealAlternate?: string | null;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
  strTags?: string | null;
  strYoutube?: string | null;
  strSource?: string | null;
  onClick?: () => void;
}

export default function RecipeCard({
  idMeal,
  strMeal,
  strMealAlternate,
  strCategory,
  strArea,
  strMealThumb,
  strTags,
  strYoutube,
  strSource,
  onClick,
}: RecipeCardProps) {
  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  return (
    <Card
      sx={{
        maxWidth: 275,
        cursor: onClick ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
      }}
      onClick={onClick}
    >

      <CardMedia
        component="img"
        height="180"
        image={strMealThumb}
        alt={strMeal}
        sx={{ objectFit: 'cover' }}
      />

      <CardContent>

        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: 'text.primary', fontWeight: 600 }}
        >
          {strMeal}
        </Typography>


        {strMealAlternate ? (
          <Typography variant="body2" color="text.secondary">
            <strong>Also known as:</strong> {strMealAlternate}
          </Typography>
        ) : null}


        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          <strong>Region:</strong> {strArea}
        </Typography>

 
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          <strong>Category:</strong> {strCategory}
        </Typography>


        {strTags ? (
          <Box sx={{ mt: 1 }}>
            {strTags.split(',').map((tag) => (
              <Box
                key={tag}
                component="span"
                sx={{
                  display: 'inline-block',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '4px',
                  px: 0.5,
                  py: 0.25,
                  fontSize: '0.75rem',
                  mr: 0.5,
                  color: 'text.secondary',
                }}
              >
                {tag}
              </Box>
            ))}
          </Box>
        ) : null}
      </CardContent>

      <CardActions sx={{ mt: 'auto', justifyContent: 'space-between' }}>
        <Button
          size="small"
          variant="outlined"
          component={Link}
          href={`/recipes/${idMeal}`}
          onClick={(e) => {
            e.stopPropagation();
            if (onClick) onClick();
          }}
        >
          Learn More
        </Button>


        <Box>
          {strYoutube && (
            <Button
              size="small"
              component="a"
              href={strYoutube}
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </Button>
          )}

        </Box>
      </CardActions>
    </Card>
  );
}
