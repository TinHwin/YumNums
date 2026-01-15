import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginInScreen from "../screens/LogInScreen";
import SignUpScreen from "../screens/SignUpScreen";

import BottomTabsNavigator from './BottomTabsNavigator';

import { useAuthContext } from '../contexts/AuthContext';

import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

function RootStackNavigator() {
    const { user, loading } = useAuthContext();

    return (
        <Stack.Navigator
            initialRouteName= 'Login'
            screenOptions={{
                headerShown: false
            }}
        >   
            {user ? (
                <Stack.Screen 
                    name='BottomTabs'
                    component={BottomTabsNavigator}
                />
            ) : (
                <>
                    <Stack.Screen
                        name="Login"
                        component={LoginInScreen}
                    />
                    <Stack.Screen
                        name='Signup'
                        component={SignUpScreen}
                    />
                </>
            )}
        </Stack.Navigator>   
    );
};

export default RootStackNavigator