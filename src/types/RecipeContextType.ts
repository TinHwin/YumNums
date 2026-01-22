export interface Nutrient {
    name: string;
    amount: number;
    unit: string;
    percentOfDailyNeeds: number;
}

export interface BaseIngredient {
    id: number;
    name: string;
}

export interface NutritionIngredient extends BaseIngredient {
    amount: number;
    unit: string;
    nutrients: Nutrient[];
}

export interface Nutrition {
    nutrients: Nutrient[]; 
    ingredients: NutritionIngredient[];
}

export interface Temperature {
    number: number;
    unit: string;
}

export interface Length {
    number: number;
    unit: string;
}

export interface Equipment {
    id: number;
    image: string;
    name: string;
    temperature?: Temperature;  
}

export interface StepIngredient extends BaseIngredient {
    image: string;
}

export interface Step {
    number: number;
    step: string;
    ingredients: StepIngredient[];
    equipment: Equipment[];
    length?: Length;
}

export interface AnalyzedInstructions {
    name: string;
    steps: Step[];
}

export interface Recipe {
    id: number;
    image: string;
    title: string;
    readyInMinutes: number;
    servings: number;
    veryHealthy: boolean;
    cheap: boolean;
    preparationMinutes?: number;
    cookingMinutes?: number;
    aggregateLikes: number;
    healthScore: number;
    pricePerServing: number;
    nutrition: Nutrition;
    summary: string;
    analyzedInstructions: AnalyzedInstructions[];
}

export interface RecipeContextType {
    savedRecipes: Recipe[];

    setSavedRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
    fetchComplexSearchRecipes: (search: string) => Promise<Recipe[] | void>;
}