// app/recipes/layout.tsx
'use client'; // only if you need client‐side interactivity inside the layout

import React from 'react';
import Link from 'next/link';

interface RecipesLayoutProps {
  children: React.ReactNode;
}

export default function RecipesLayout({ children }: RecipesLayoutProps) {
  return (
    <div
      style={{
        maxWidth: 1000,
        margin: '0 auto',
        padding: '1rem',
        fontFamily: 'system-ui, sans-serif',
      }}
    >

      <nav
        style={{
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <Link href="/" style={{ textDecoration: 'none', color: '#0066cc' }}>
          ← Home
        </Link>
        <span style={{ color: '#555' }}>/</span>
        <span style={{ fontWeight: 600 }}>Recipes</span>
      </nav>

      <main>{children}</main>
    </div>
  );
}
