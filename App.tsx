import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/AuthContext';
import { UserGoalsAndPreferencesProvider } from './src/contexts/UserGoalsAndPreferencesContext';
import { RecipeProvider } from './src/contexts/RecipeContext';
import { MealPlanProvider } from './src/contexts/MealPlanContext';
import { DateProvider } from './src/contexts/DateContext';
import RootStackNavigator from './src/navigation/RootStackNavigator';
import BottomTabsNavigator from './src/navigation/BottomTabsNavigator';

const App = () => {
  const isSignedIn = true;

  return (
    <SafeAreaProvider>
      <UserGoalsAndPreferencesProvider>
        <DateProvider>
          <RecipeProvider>
            <MealPlanProvider>
              <AuthProvider>
                <NavigationContainer>
                  <RootStackNavigator />
                </NavigationContainer>
              </AuthProvider>
            </MealPlanProvider>
          </RecipeProvider>
        </DateProvider>
      </UserGoalsAndPreferencesProvider>
    </SafeAreaProvider>
  );
};

export default App;