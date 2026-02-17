import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  Button
} from 'react-native';

import { useMealPlanContext } from '../contexts/MealPlanContext';
import { Recipe } from '../types/RecipeContextType';
import { useRecipeContext } from '../contexts/RecipeContext';

import Icon from '../components/icons/Icon';
import { Colors } from '../styles/themes/colors';
import { Spacing } from '../styles/themes/spacing';
import { Radius } from '../styles/themes/radius';

import { RecipeCard } from '../components/RecipeCard';
import { useDateContext } from '../contexts/DateContext';

const MealPlanScreen = () => {
  const { mealPlan } = useMealPlanContext();
  const { plannedRecipes } = useRecipeContext();

  const computeDatesInRange = (start: Date, end: Date): Date[] => {
    const dates: Dates[] = [];
    const currentDate = new Date(start);

    while (currentDate <= end) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const { thisWeekDates } = useDateContext();
  const thisWeekDatesArray = computeDatesInRange(thisWeekDates.start, thisWeekDates.end);

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.mealPlanScrollView}>
        <View style={styles.mealResultsContainer}>
          {thisWeekDatesArray.map(date => {
            const dateKey = date.toISOString().split('T')[0];
            const meals = mealPlan[dateKey] || [];

            // typeof is the same as the type of meals
            const mealsByMealType: Record<string, typeof meals> = {
              Breakfast: [],
              Lunch: [],
              Dinner: []
            };

            meals.forEach(meal => {
              if (meal.mealType in mealsByMealType) {
                mealsByMealType[meal.mealType].push(meal);
              }
            });

            return (
              <View key={dateKey}>
                <Text style={styles.mealHeaderContainer}>{dateKey}</Text>

                {mealsByMealType.Breakfast.length > 0 && (
                  <>
                    <Text>Breakfast</Text>
                    {mealsByMealType.Breakfast.map(meal => {
                      const recipe = Object.values(plannedRecipes).find(recipe => meal.recipeId === recipe.id);

                      if (!recipe) return null;

                      return (
                        <RecipeCard key={meal.id} recipe={recipe} toggleMealButton='Remove' />
                      );
                    })}
                  </>
                )};

                {mealsByMealType.Lunch.length > 0 && (
                  <>
                    <Text>Lunch</Text>
                    {mealsByMealType.Lunch.map(meal => {
                      const recipe = Object.values(plannedRecipes).find(recipe => meal.recipeId === recipe.id);

                      if (!recipe) return null;

                      return (
                        <RecipeCard key={meal.id} recipe={recipe} toggleMealButton='Remove' />
                      );
                    })}
                  </>
                )};

                {mealsByMealType.Dinner.length > 0 && (
                  <>
                    <Text>Dinner</Text>
                    {mealsByMealType.Dinner.map(meal => {
                      const recipe = Object.values(plannedRecipes).find(recipe => meal.recipeId === recipe.id);

                      if (!recipe) return null;

                      return (
                        <RecipeCard key={meal.id} recipe={recipe} toggleMealButton='Remove' />
                      );
                    })}
                  </>
                )};
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    marginBottom: Spacing.xxl * 2
  },
  mealPlanScrollView: {
    flexGrow: 1,
  },
  mealContainer: {
    flex: 1,
    backgroundColor: Colors.surface,
    marginBottom: Spacing.xl,
    padding: Spacing.md,
    borderRadius: Radius.md
  },
  mealHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
    gap: Spacing.md
  },
  mealResultsContainer: {
    padding: Spacing.sm
  }
});

export default MealPlanScreen;
