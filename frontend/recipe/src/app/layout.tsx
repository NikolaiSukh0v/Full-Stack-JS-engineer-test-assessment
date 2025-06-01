
import React, { ReactNode } from 'react';

export const metadata = {
  title: 'My Recipe App',
  description: 'Browse and filter recipes by country, ingredient, or category',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
          <h1>
            <a href="/">🍽️ Recipe App</a>
          </h1>
        </header>
        <main style={{ padding: '1rem' }}>{children}</main>
      </body>
    </html>
  );
}
