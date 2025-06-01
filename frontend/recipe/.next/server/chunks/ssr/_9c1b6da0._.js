module.exports = {

"[project]/.next-internal/server/app/recipes/[idMeal]/page/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/src/app/recipes/layout.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/recipes/layout.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/src/app/recipes/[idMeal]/page.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// /app/recipes/[idMeal]/page.tsx
__turbopack_context__.s({
    "default": (()=>RecipeInfoPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
;
;
function normalizeRawMeal(raw) {
    const ingredients = [];
    for(let i = 1; i <= 20; i++){
        const ingKey = `strIngredient${i}`;
        const measureKey = `strMeasure${i}`;
        const ingVal = raw[ingKey]?.trim();
        const measureVal = raw[measureKey]?.trim();
        if (ingVal && ingVal.length > 0) {
            ingredients.push({
                name: ingVal,
                measure: measureVal || ''
            });
        }
    }
    return {
        id: raw.idMeal,
        name: raw.strMeal,
        alternateName: raw.strMealAlternate,
        category: raw.strCategory,
        country: raw.strArea,
        instructions: raw.strInstructions,
        imageUrl: raw.strMealThumb,
        youtubeUrl: raw.strYoutube,
        sourceUrl: raw.strSource,
        ingredients
    };
}
async function fetchRecipeByIdMeal(idMeal) {
    const res = await fetch(`http://localhost:3000/recipes/${idMeal}`, {
        cache: 'no-store'
    });
    if (!res.ok) throw new Error(`Failed to fetch recipe ${idMeal} (status ${res.status})`);
    const data = await res.json();
    if (!data.meals || data.meals.length === 0) return null;
    return normalizeRawMeal(data.meals[0]);
}
async function fetchRecipesByCategory(category) {
    const listRes = await fetch(`http://localhost:3000/recipes?category=${encodeURIComponent(category)}`, {
        cache: 'no-store'
    });
    if (!listRes.ok) throw new Error(`Failed to fetch list for category ${category}`);
    const listData = await listRes.json();
    if (!listData.meals) return [];
    // Then do lookup for each idMeal to get full RawMeal
    const lookupPromises = listData.meals.map((m)=>fetch(`http://localhost:3000/recipes/${m.idMeal}`, {
            cache: 'no-store'
        }).then((r)=>{
            if (!r.ok) throw new Error(`Lookup failed for ${m.idMeal}`);
            return r.json();
        }).then((resp)=>resp.meals && resp.meals.length > 0 ? normalizeRawMeal(resp.meals[0]) : null));
    const all = await Promise.all(lookupPromises);
    return all.filter((r)=>r !== null);
}
async function RecipeInfoPage({ params }) {
    const { idMeal } = params;
    const recipe = await fetchRecipeByIdMeal(idMeal);
    if (!recipe) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
    const related = await fetchRecipesByCategory(recipe.category);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: "123"
    }, void 0, false);
}
}}),
"[project]/src/app/recipes/[idMeal]/page.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/recipes/[idMeal]/page.tsx [app-rsc] (ecmascript)"));
}}),

};

//# sourceMappingURL=_9c1b6da0._.js.map