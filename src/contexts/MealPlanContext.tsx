import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { PlannedMeal, MealPlanContextType, MealType } from '../types/MealPlanContextType';
import { Recipe } from '../types/RecipeContextType';
import { useRecipeContext } from '../contexts/RecipeContext';

export const MealPlanContext = createContext<MealPlanContextType | null>(null);

export const MealPlanProvider = ({ children }: { children: React.ReactNode }) => {
    const [mealPlan, setMealPlan] = useState<Record<string, PlannedMeal[]>>({});
    const { plannedRecipes } = useRecipeContext();

    useEffect(() => {
        const loadMealPlan = async () => {
            try {
                const storedMealPlan = await AsyncStorage.getItem('mealPlan');

                if (storedMealPlan) setMealPlan(JSON.parse(storedMealPlan));
            } catch (error) {
                console.log('Error loadding meal plan: ', error);
            }
        };

        loadMealPlan();
    }, []);

    useEffect(() => {
        const storeMealPlan = async () => {
            try {
                await AsyncStorage.setItem('mealPlan', JSON.stringify(mealPlan));
            } catch (error) {
                console.log('Error saving meal plan: ', error);
            }
        };

        storeMealPlan()
    }, [mealPlan]);

    const addMeal = (date: Date, mealType: MealType, recipeId: number) => {
        const dateKey = date.toISOString().split('T')[0];

        const newMeal: PlannedMeal = {
            id: Date.now().toString(),
            recipeId,
            date: dateKey,
            mealType
        };

        console.log('New meal:', newMeal);

        setMealPlan(prev => ({
            ...prev,
            [dateKey]: [...(prev[dateKey] || []), newMeal],
        }));
    };

    const retrieveRecipe = (recipeId: number) => {
        const recipe = plannedRecipes.find(recipe => recipeId === recipe.id);

        return recipe;
    };

    return (
        <MealPlanContext.Provider value={{ mealPlan, addMeal }}>
            {children}
        </MealPlanContext.Provider>
    );
};

export const useMealPlanContext = () => {
    const context = useContext(MealPlanContext);

    if (!context) throw new Error('useMealPlanContext must be used inside AuthProvider');

    return context;
}