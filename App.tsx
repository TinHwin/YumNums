import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/AuthContext';
import { UserGoalsAndPreferencesProvider } from './src/contexts/UserGoalsAndPreferencesContext';

import RootStackNavigator from './src/navigation/RootStackNavigator';
import BottomTabsNavigator from './src/navigation/BottomTabsNavigator';

const App = () => {
  const isSignedIn = true;

  return (
    <UserGoalsAndPreferencesProvider>
      <AuthProvider>
        <NavigationContainer>
          <RootStackNavigator />
        </NavigationContainer>
      </AuthProvider>
    </UserGoalsAndPreferencesProvider>
  );
};

export default App;