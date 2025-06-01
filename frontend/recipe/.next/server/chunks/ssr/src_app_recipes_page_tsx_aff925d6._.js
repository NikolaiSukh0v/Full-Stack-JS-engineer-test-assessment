module.exports = {

"[project]/src/app/recipes/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// app/recipes/page.tsx
__turbopack_context__.s({
    "default": (()=>RecipesPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$RecipeCard$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/RecipeCard/index.tsx [app-ssr] (ecmascript)");
'use client';
;
;
async function RecipesPage() {
    // 1) Fetch your list of recipes from the backend:
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood', {
        // Remove `cache: 'no-store'` if you want ISR or caching
        cache: 'no-store'
    });
    if (!res.ok) {
        // Handle error
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            children: "Failed to load recipes."
        }, void 0, false, {
            fileName: "[project]/src/app/recipes/page.tsx",
            lineNumber: 27,
            columnNumber: 12
        }, this);
    }
    // Suppose the API returns { meals: RawMealSummary[] }
    const data = await res.json();
    const meals = data.meals || [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(275px, 1fr))',
            gap: '1rem',
            padding: '1rem'
        },
        children: meals.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$RecipeCard$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                idMeal: m.idMeal,
                strMeal: m.strMeal,
                strMealAlternate: m.strMealAlternate,
                strCategory: m.strCategory,
                strArea: m.strArea,
                strMealThumb: m.strMealThumb,
                strTags: m.strTags,
                strYoutube: m.strYoutube,
                strSource: m.strSource
            }, m.idMeal, false, {
                fileName: "[project]/src/app/recipes/page.tsx",
                lineNumber: 37,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/app/recipes/page.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=src_app_recipes_page_tsx_aff925d6._.js.map