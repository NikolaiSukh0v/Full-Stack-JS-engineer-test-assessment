# Recipe Application

This repository contains two separate folders for the Backend (Node.js + Express + TypeScript) and Frontend (Next.js). Follow the instructions below to install, configure, and run both parts in parallel.


/ (root)
├── backend/
│   ├── src/
│   │   ├── controllers/    ← RecipeController.ts  
│   │   ├── routes/         ← RecipeRoutes.ts  
│   │   ├── models/         ← Recipe.ts (data‐model abstraction)  
│   │   ├── server.ts       ← Express entry point  
│   │   └── …
│   ├── package.json  
│   ├── tsconfig.json  
│   └── .env                ← Environment variables for backend  
└── frontend/
    ├── app/
    │   └── recipes/        ← Next.js pages for recipe list & details  
    │       └── [idMeal]/  
    │           └── page.tsx  
    ├── public/             ← Static assets (e.g., images, icons)  
    ├── styles/             ← Global CSS (if any)  
    ├── package.json  
    ├── tsconfig.json  
    └── .env.local          ← Environment variables for frontend  
```

- The **backend** (`backend/`) runs an Express + TypeScript API on port 3000 by default.  
- The **frontend** (`frontend/`) runs a Next.js app that communicates with the backend.  



## Table of Contents

1. [Prerequisites](#prerequisites)  
2. [Project Structure](#project-structure)  
3. [Backend Setup (Node.js + Express + TypeScript)](#backend-setup-nodejs--express--typescript)  
   - [1. Install Dependencies](#1-install-dependencies)  
   - [2. Configure Environment Variables](#2-configure-environment-variables)  
   - [3. Run the Backend](#3-run-the-backend)  
   - [4. Verify the Backend](#4-verify-the-backend)  
4. [Frontend Setup (Next.js)](#frontend-setup-nextjs)  
   - [1. Install Dependencies](#1-install-dependencies-1)  
   - [2. Configure Environment Variables](#2-configure-environment-variables-1)  
   - [3. Run the Frontend](#3-run-the-frontend)  
   - [4. Verify the Frontend](#4-verify-the-frontend)  
5. [Parallel Execution](#parallel-execution)  
6. [Testing the Application](#testing-the-application)  
7. [API Documentation](#api-documentation)  




/ (root)
├── backend/                ← Backend implementation
│   ├── src/
│   │   ├── controllers/    ← RecipeController.ts  
│   │   ├── routes/         ← RecipeRoutes.ts  
│   │   ├── models/         ← Recipe.ts (data‐model abstraction)  
│   │   ├── server.ts       ← Express entry point  
│   │   └── …
│   ├── package.json  
│   ├── tsconfig.json  
│   └── .env                ← Environment variables for backend  
└── frontend/               ← Frontend implementation (Next.js)
    ├── app/
    │   └── recipes/        ← Next.js pages for recipe list & details  
    │       └── [idMeal]/  
    │           └── page.tsx  
    ├── public/             ← Static assets (e.g., images, icons)  
    ├── styles/             ← Global CSS (if any)  
    ├── package.json  
    ├── tsconfig.json  
    └── .env.local          ← Environment variables for frontend  
```



## Backend Setup (Node.js + Express + TypeScript)

1. **Install Dependencies**  
   ```bash
   cd backend
   npm install
   ```
   This will install:
   - `express`
   - `cors`
   - `axios`
   - `typescript`
   - `ts-node`
   - `nodemon`
   - `@types/express`, `@types/node`, etc.

2. **Configure Environment Variables**  
   In the `backend/` folder, create a file named `.env` with the following content:

   ```env
   RECIPE_BASE_URL=https://www.themealdb.com/api/json/v1/1
   PORT=3000
   ```

   - `RECIPE_BASE_URL`  
     - The base URL for TheMealDB API (used by the `getById` endpoint).  
   - `PORT`  
     - The port on which the Express server will listen (default: 3000).

3. **Run the Backend**  
   - **Development Mode** (auto-restarts on file changes):  
     ```bash
     npm run dev
     ```
     Uses `nodemon` + `ts-node` to watch `.ts` files and restart on changes.  
   - **Production Mode** (after building):  
     ```bash
     npm run build
     npm run start
     ```
     - `npm run build` compiles TypeScript files into `dist/`.  
     - `npm run start` runs the compiled JavaScript in `dist/`.

   When the server is running, you should see:
   ```
   Server listening on http://localhost:3000
   ```

4. **Verify the Backend**  
   - **Health Check**  
     ```bash
     curl http://localhost:3000/
     ```
     Expected response:
     ```json
     { "status": "OK" }
     ```
   - **Fetch a Recipe by ID**  
     ```bash
     curl http://localhost:3000/recipes/52772
     ```
     Expected response (JSON):
     ```json
     {
       "meals": [
         {
           "idMeal": "52772",
           "strMeal": "Teriyaki Chicken Casserole",
           "strCategory": "Chicken",
           "strArea": "Japanese",
           "strInstructions": "...",
           "strMealThumb": "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
           …
         }
       ]
     }
     ```
   - **Filter/List Recipes** (depending on your `Recipe.fetchRecipes` implementation):  
     ```bash
     curl 'http://localhost:3000/recipes?category=Chicken'
     curl 'http://localhost:3000/recipes?country=Japanese'
     curl 'http://localhost:3000/recipes?ingredient=soy%20sauce'
     ```

---

## Frontend Setup (Next.js)

> **Note:** The backend occupies port **3000**, so we run Next.js on **3001**.

1. **Install Dependencies**  
   ```bash
   cd frontend
   npm install
   ```
   This will install:
   - `next`
   - `react`
   - `react-dom`
   - `@mui/material`
   - `@emotion/react`
   - `@emotion/styled`
   - `typescript`
   - Other essential Next.js dependencies

2. **Configure Environment Variables**  
   In the `frontend/` folder, create a file named `.env.local` with the following content:

   ```env
   NEXT_PUBLIC_BACKEND_BASE=http://localhost:3000
   PORT=3001
   ```

   - `NEXT_PUBLIC_BACKEND_BASE`  
     - The URL where the backend is running.  
     - The `NEXT_PUBLIC_` prefix ensures this variable is exposed to client‐side code.  
   - `PORT`  
     - Forces Next.js to run on port 3001 (default is 3000, but that’s taken by the backend).

3. **Run the Frontend**  
   ```bash
   npm run dev
   ```
   This will start Next.js on `http://localhost:3001`. You should see:
   ```
   ready - started server on 0.0.0.0:3001, url: http://localhost:3001
   ```

4. **Verify the Frontend**  
   - Open your browser to:
     ```
     http://localhost:3001
     ```
     You should see the Next.js application’s landing page (e.g. header or home).  
   - **Visit a Recipe Detail Page**  
     ```
     http://localhost:3001/recipes/52772
     ```
     You should see:
     1. Recipe image (top-left)  
     2. Recipe name (center)  
     3. Recipe country (clickable, navigates to `?country=…`)  
     4. Instructions (centered)  
     5. Ingredients list (each clickable to `?ingredient=…`)  
     6. Right sidebar with “More in [Category]” (clickable to recipe detail)  
     7. “View All [Category]” link at bottom of sidebar  

---

## Parallel Execution

1. **Open two terminal windows/tabs**  
2. **Terminal A: Start Backend**  
   ```bash
   cd backend
   npm run dev
   ```
   - Backend runs on `http://localhost:3000`.  
3. **Terminal B: Start Frontend**  
   ```bash
   cd frontend
   npm run dev
   ```
   - Frontend runs on `http://localhost:3001`.  

Now you can navigate to `http://localhost:3001` in your browser and use the app. All API calls from the frontend (e.g. `fetch("/recipes/...")`) will resolve to `http://localhost:3000`.

---

## Testing the Application

1. **CORS Validation**  
   - The backend uses the `cors` middleware to allow requests from `http://localhost:3001`.  
   - If a CORS error appears in the browser console, verify that:
     - Backend `server.ts` includes:  
       ```ts
       import cors from 'cors';
       app.use(cors({ origin: 'http://localhost:3001' }));
       app.options('*', cors());
       ```
     - Frontend `.env.local` has `NEXT_PUBLIC_BACKEND_BASE=http://localhost:3000`.  
     - Both servers are restarted after any `.env` change.

2. **Manual User Flows**  
   - **List Page**  
     Visit:  
     ```
     http://localhost:3001/recipes?category=Chicken
     ```  
     Confirm that recipes filtered by category appear.  
   - **Recipe Detail**  
     Click on a recipe from the list or navigate directly:  
     ```
     http://localhost:3001/recipes/52772
     ```  
     - Verify the image appears at top-left.  
     - Verify the name is centered.  
     - Verify the country link navigates to `http://localhost:3001/recipes?country=[CountryName]`.  
     - Verify instructions are below the name.  
     - Verify each ingredient in the list is clickable to `?ingredient=[IngredientName]`.  
     - Verify the right sidebar shows “More in [Category]” and clicking a related recipe navigates correctly.  
     - Verify the “View All [Category]” link at the bottom of the sidebar navigates to a list filtered by that category.

3. **API Testing (Backend Only)**  
   From a separate terminal (or use Postman), run:
   ```bash
   # Health-check
   curl http://localhost:3000/

   # Lookup by ID
   curl http://localhost:3000/recipes/52772

   # Filter by category, country, or ingredient
   curl 'http://localhost:3000/recipes?category=Chicken'
   curl 'http://localhost:3000/recipes?country=Japanese'
   curl 'http://localhost:3000/recipes?ingredient=soy%20sauce'
   ```
   Ensure that each endpoint returns valid JSON and appropriate HTTP status codes.

---

## API Documentation

- **TheMealDB (External Free Recipe API)**  
  - Base URL: `https://www.themealdb.com/api/json/v1/1`  
  - **Lookup Recipe by ID**  
    - Endpoint: `/lookup.php?i={id}`  
    - Example: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772`  
    - Returns JSON with a `meals` array (or `meals: null` if not found).

- **Backend Recipe Endpoints** (Proxy/Wrapper around TheMealDB + custom filters)  
  1. **List / Filter Recipes**  
     ```
     GET http://localhost:3000/recipes
     ```
     - Query parameters (all optional):
       - `category` (string)  
       - `country` (string)  
       - `ingredient` (string)  
     - Example:  
       ```
       http://localhost:3000/recipes?category=Chicken
       ```
     - Returns: JSON array or object (depending on your model) of filtered recipes.

  2. **Lookup Recipe by ID**  
     ```
     GET http://localhost:3000/recipes/{id}
     ```
     - Example:  
       ```
       http://localhost:3000/recipes/52772
       ```
     - Proxies to:  
       ```
       https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
       ```
     - Returns: JSON object with a `meals` array (or `404` if not found).

For more details on available endpoints and data structure, refer to [Free Recipe API Support](https://www.themealdb.com/api.php).

---

## Environment Variables Summary

- **Backend (`backend/.env`)**  
  ```env
  RECIPE_BASE_URL=https://www.themealdb.com/api/json/v1/1
  PORT=3000
  ```

- **Frontend (`frontend/.env.local`)**  
  ```env
  NEXT_PUBLIC_BACKEND_BASE=http://localhost:3000
  PORT=3001
  ```


