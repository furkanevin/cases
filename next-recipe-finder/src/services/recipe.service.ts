export async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Resource not found");
    }
    throw new Error(`API request failed with status ${response.status}`);
  }
  return await response.json();
}

export function getApiKey(): string {
  const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
  if (!apiKey) {
    throw new Error("API key is not configured");
  }
  return apiKey;
}

export const DEFAULT_CACHE_DURATION = 60;
// Basic recipe type
export interface Recipe {
  id: number;
  title: string;
  image: string;
}

// Recipe search response
export interface RecipesResponse {
  results: Recipe[];
  totalResults: number;
}

// Recipe summary for search results
export interface RecipeSummary {
  id: number;
  title: string;
  image: string;
  imageType: string;
}

// Complete search response
export interface RecipeSearchResponse {
  results: RecipeSummary[];
  offset: number;
  number: number;
  totalResults: number;
}

// Recipe ingredient
export interface Ingredient {
  id: number;
  original: string;
  name: string;
  amount: number;
  unit: string;
  image: string;
}

// Instruction step
export interface InstructionStep {
  number: number;
  step: string;
  ingredients?: { id: number; name: string; image: string }[];
  equipment?: { id: number; name: string; image: string }[];
}

// Complete instruction
export interface Instruction {
  name: string;
  steps: InstructionStep[];
}

// Detailed recipe information
export interface RecipeDetails {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
  healthScore: number;
  dishTypes: string[];
  extendedIngredients: Ingredient[];
  analyzedInstructions: Instruction[];
}

// Search parameters
export interface SearchParams {
  query?: string;
  cuisine?: string;
  diet?: string;
  intolerances?: string;
  includeIngredients?: string;
  excludeIngredients?: string;
  type?: string;
  maxReadyTime?: number;
  minCalories?: number;
  maxCalories?: number;
  sort?: string;
  sortDirection?: string;
  offset?: number;
  number?: number;
}

export async function searchRecipes(
  params: SearchParams
): Promise<RecipeSearchResponse> {
  const apiKey = getApiKey();

  // Build query parameters
  const queryParams = new URLSearchParams();
  queryParams.append("apiKey", apiKey);

  // Add all search params that are defined
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      queryParams.append(key, value.toString());
    }
  });

  // Set default number of results if not specified
  if (!params.number) {
    queryParams.append("number", "12");
  }

  // Make the API request
  const response = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?${queryParams.toString()}`,
    { next: { revalidate: DEFAULT_CACHE_DURATION } }
  );

  return handleApiResponse<RecipeSearchResponse>(response);
}

export async function getRecipeDetails(id: string): Promise<RecipeDetails> {
  const apiKey = getApiKey();

  const response = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`,
    { next: { revalidate: DEFAULT_CACHE_DURATION } }
  );

  return handleApiResponse<RecipeDetails>(response);
}

export function formatSearchSummary(params: {
  query?: string;
  cuisine?: string;
  diet?: string;
  type?: string;
  maxReadyTime?: number;
}): string {
  const parts: string[] = [];

  if (params.query) {
    parts.push(`"${params.query}"`);
  }

  if (params.cuisine) {
    parts.push(params.cuisine);
  }

  if (params.diet) {
    parts.push(params.diet);
  }

  if (params.type) {
    parts.push(params.type);
  }

  if (params.maxReadyTime) {
    parts.push(`Ready in ${params.maxReadyTime} min`);
  }

  if (parts.length === 0) {
    return "All recipes";
  }

  return parts.join(" • ");
}
