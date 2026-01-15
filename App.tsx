import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/AuthContext';

import RootStackNavigator from './src/navigation/RootStackNavigator';
import BottomTabsNavigator from './src/navigation/BottomTabsNavigator';

const App = () => {
  const isSignedIn = true;
  
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;