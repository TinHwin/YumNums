import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/AuthContext';
import { UserGoalsAndPreferencesProvider } from './src/contexts/UserGoalsAndPreferencesContext';
import { RecipeProvider } from './src/contexts/RecipeContext';

import RootStackNavigator from './src/navigation/RootStackNavigator';
import BottomTabsNavigator from './src/navigation/BottomTabsNavigator';

const App = () => {
  const isSignedIn = true;

  return (
    <UserGoalsAndPreferencesProvider>
      <RecipeProvider>
        <AuthProvider>
          <NavigationContainer>
            <RootStackNavigator />
          </NavigationContainer>
        </AuthProvider>
    </RecipeProvider>
    </UserGoalsAndPreferencesProvider>
  );
};

export default App;