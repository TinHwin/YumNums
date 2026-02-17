import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Diets, Intolerances } from '../types/UserGoalsAndPreferencesContextType';
import { Recipe, RecipeContextType } from '../types/RecipeContextType';

import { useUserGoalsAndPreferencesContext } from './UserGoalsAndPreferencesContext';

import { SPOONACULAR_API_KEY } from '@env';

export const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider = ({ children }: { children: React.ReactNode }) => {
    const { diets, intolerances } = useUserGoalsAndPreferencesContext();

    const [plannedRecipes, setPlannedRecipes] = useState<Record<number, Recipe>>({});

    const combineDietsParam = () => {
        const dietsMap: Record<keyof Diets, string> = {
            glutenFree: "gluten free",
            ketogenic: "ketogenic",
            vegetarian: "vegetarian",
            lactoVegetarian: "lacto vegetarian",
            ovoVegetarian: "ovo vegetarian",
            vegan: "vegan",
            pescetarian: "pescetarian",
            paleo: "paleo",
            primal: "primal",
            lowFodmap: "low FODMAP",
            whole30: "whole30"
        };

        const dietParam = Object.entries(diets)
            .filter(([_, value]) => value)
            .map(([key]) => dietsMap[key as keyof Diets])
            .join(',');

        return dietParam;
    };

    const combineIntolerancesParam = () => {
        const intolerancesMap: Record<keyof Intolerances, string> = {
            dairy: 'dairy',
            egg: 'egg',
            gluten: 'gluten',
            grain: 'grain',
            peanut: 'peanut',
            seafood: 'seafood',
            sesame: 'sesame',
            shellfish: 'shellfish',
            soy: 'soy',
            sulfite: 'sulfite',
            treeNut: 'tree nut',
            wheat: 'wheat'
        };

        const intolerancesParam = Object.entries(intolerances)
            .filter(([_, value]) => value)
            .map(([key]) => intolerancesMap[key as keyof Intolerances])
            .join(',');

        return intolerancesParam;
    };

    const fetchComplexSearchRecipes = async (search: string) => {
        const offset = Math.floor(Math.random() * 30);

        let queryParams = `query=${search}&offset=${offset}&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true&number=5&apiKey=${SPOONACULAR_API_KEY}`;

        const dietsParam = combineDietsParam();

        if (dietsParam) {
            queryParams += `&diet=${dietsParam}`;
        }

        const intolerancesParam = combineIntolerancesParam();

        if (intolerancesParam) {
            queryParams += `&intolerances=${intolerancesParam}`;
        }

        const url = `https://api.spoonacular.com/recipes/complexSearch?${queryParams}`;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                console.error("Network error:", response.statusText);
                return [];
            }

            const data = await response.json();

            if (!data.results) {
                console.error("ERROR DATA: ", data);
                return [];
            }

            return data.results ?? [];
        } catch (error) {
            console.error("Fetch failed:", error);

            return [];
        }
    }

    useEffect(() => {
        const loadPlannedRecipes = async () => {
            try {
                const storedPlannedRecipes = await AsyncStorage.getItem('plannedRecipes');

                if (storedPlannedRecipes) setPlannedRecipes(JSON.parse(storedPlannedRecipes));
            } catch (error) {
                console.log('Error loading planned recipes:', error);
            }
        };

        loadPlannedRecipes();
    }, []);

    useEffect(() => {
        const storedPlannedRecipes = async () => {
            try {
                await AsyncStorage.setItem('plannedRecipes', JSON.stringify(plannedRecipes));
            } catch (error) {
                console.log('Error saving planned recipes: ', error);
            }
        };

        storedPlannedRecipes();
    }, [plannedRecipes]);

    const addRecipe = (recipe: Recipe) => {
        setPlannedRecipes(prev => ({
            ...prev,
            [recipe.id]: recipe
        }));

        console.log('planned recipes:', plannedRecipes);
    };

    return (
        <RecipeContext.Provider
            value={{ plannedRecipes, setPlannedRecipes, addRecipe, fetchComplexSearchRecipes }}
        >
            {children}
        </RecipeContext.Provider>
    )
}

export const useRecipeContext = () => {
    const context = useContext(RecipeContext);

    if (!context) throw new Error('useRecipeContext must be used inside AuthProvider');

    return context;
}