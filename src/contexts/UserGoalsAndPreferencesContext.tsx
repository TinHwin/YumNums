import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Diets, Intolerances, UserGoalsAndPreferencesContextType } from '../types/UserGoalsAndPreferencesContextType';

export const UserGoalsAndPreferencesContext = createContext<UserGoalsAndPreferencesContextType | undefined>(undefined);

export const UserGoalsAndPreferencesProvider = ({ children }: { children: React.ReactNode }) => {
    const [weeklyBudget, setWeeklyBudget] = useState<string>('')
    const [weeklyCalories, setWeeklyCalories] = useState<string>('');
    const [diets, setDiets] = useState<Diets>({
        glutenFree: false,
        ketogenic: false,
        vegetarian: false,
        lactoVegetarian: false,
        ovoVegetarian: false,
        vegan: false,
        pescetarian: false,
        paleo: false,
        primal: false,
        lowFodmap: false,
        whole30: false,
    });
    const [intolerances, setIntolerances] = useState<Intolerances>({
        dairy: false,
        egg: false,
        gluten: false,
        grain: false,
        peanut: false,
        seafood: false,
        sesame: false,
        shellfish: false,
        soy: false,
        sulfite: false,
        treeNut: false,
        wheat: false,
    });

    useEffect(() => {
        const loadUserGoalsAndPreferences = async () => {
            try {
                const storedWeeklyBudget = await AsyncStorage.getItem('weeklyBudget');
                const storedWeeklyCalories = await AsyncStorage.getItem('weeklyCalories');
                const storedDiets = await AsyncStorage.getItem('diets');
                const storedIntolerances = await AsyncStorage.getItem('intolerances');

                if (storedWeeklyBudget) setWeeklyBudget(storedWeeklyBudget);
                if (storedWeeklyCalories) setWeeklyCalories(storedWeeklyCalories);
                if (storedDiets) setDiets(JSON.parse(storedDiets));
                if (storedIntolerances) setIntolerances(JSON.parse(storedIntolerances));
            } catch (error) {
                console.error('Failed to load user goals and preferences from AsyncStorage', error);
            }
        };

        loadUserGoalsAndPreferences();
    }, []);

    useEffect(() => {
        AsyncStorage.setItem('weeklyBudget', weeklyBudget);
    }, [weeklyBudget]);

    useEffect(() => {
        AsyncStorage.setItem('weeklyCalories', weeklyCalories);
    }, [weeklyCalories]);

    useEffect(() => {
        AsyncStorage.setItem('diets', JSON.stringify(diets));
    }, [diets]);

    useEffect(() => {
        AsyncStorage.setItem('intolerances', JSON.stringify(intolerances));
    }, [intolerances]);

    const toggleDiet = (key: (keyof Diets)) => {
        setDiets(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const toggleIntolerance = (key: (keyof Intolerances)) => {
        setIntolerances(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <UserGoalsAndPreferencesContext.Provider
            value={{ weeklyBudget, setWeeklyBudget, weeklyCalories, setWeeklyCalories, diets, toggleDiet, intolerances, toggleIntolerance }}
        >
            { children }
        </UserGoalsAndPreferencesContext.Provider>
    )
}

export const useUserGoalsAndPreferencesContext = () => {
    const context = useContext(UserGoalsAndPreferencesContext);

    if (!context) throw new Error('useUserGoalsAndPreferencesContext must be used inside AuthProvider');

    return context;
}