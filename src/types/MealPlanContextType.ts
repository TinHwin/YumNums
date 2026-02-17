export type MealType =
    | 'Breakfast'
    | 'Lunch'
    | 'Dinner'

export interface PlannedMeal {
    id: string;
    recipeId: number;
    date: string;
    mealType: MealType;
}

// Date is the key and plannedmeal is the values
export interface MealPlanContextType {
    mealPlan: Record<string, PlannedMeal[]>;
    addMeal: (date: Date, mealType: MealType, recipeId: number) => void;
}