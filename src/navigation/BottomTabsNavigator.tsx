import { View, StyleSheet, TouchableOpacity, Alert, Text, } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from "../screens/HomeScreen";
import MealPlanScreen from "../screens/MealPlanScreen";
import RecipeSearchScreen from "../screens/RecipeSearchScreen";
import ShoppingListScreen from "../screens/ShoppingListScreen";
import UserPreferencesScreen from "../screens/UserGoalsAndPreferencesScreen";
import AskAIScreen from '../screens/AskAIScreen';

import {
    Calendar,
    ShoppingCart,
    House,
    Book,
    Sparkles,
    LogOut,
} from 'lucide-react-native';
import { useAuthContext } from '../contexts/AuthContext';

import UserGoalsAndPreferencesScreen from '../screens/UserGoalsAndPreferencesScreen';

const HomeStack = createNativeStackNavigator();

function HomeStackNavigator() {
    const { user, loading, signInWithGoogle, signOut } = useAuthContext();

    let LogOutcomponent = LogOut;

    return (
        <HomeStack.Navigator 
            initialRouteName='Home'
        >
            
            <HomeStack.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                    headerShadowVisible: false,
                    headerStyle: bottomTabsStyles.headerStyle,
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => {
                                Alert.alert(
                                    'Sign Out',
                                    'Are you sure you want to sign out?',
                                    [
                                        { text: 'Cancel', style: 'cancel' },
                                        { text: 'Sign Out', style: 'destructive', onPress: signOut }
                                    ]
                                )
                            }}
                            style={bottomTabsStyles.logOutContainerStyle}
                        >
                            <Text
                                style={bottomTabsStyles.logOutTextStyle}
                            >Sign Out</Text>
                            <LogOutcomponent size={24} color="white" />
                        </TouchableOpacity>
                    )
                }}
                
            />
            <HomeStack.Screen
                name='Goals & Preferences'
                component={UserGoalsAndPreferencesScreen}
                options={{
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                    headerShadowVisible: false,
                    headerStyle: bottomTabsStyles.headerStyle,
                }}
            />
        </HomeStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

function BottomTabsNavigator() {    
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let IconComponent;

                    switch(route.name) {
                        case "Meal Plan":
                            IconComponent = Calendar;
                            break;
                        case "Shopping List":
                            IconComponent = ShoppingCart;
                            break;
                        case "Home":
                            IconComponent = House;
                            break;
                        case "Recipe Search":
                            IconComponent = Book;
                            break;
                        case "Ask AI":
                            IconComponent = Sparkles;
                            break;
                    }

                    return <IconComponent color={color} size={size} />;
                },
                headerShown: false,
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'white',
                tabBarStyle: bottomTabsStyles.tabBarStyle,
                tabBarItemStyle: bottomTabsStyles.tabBarItemStyle,
            })}
        >
            <Tab.Screen 
                name="Meal Plan"
                component={MealPlanScreen}
            />
            <Tab.Screen
                name="Shopping List"
                component={ShoppingListScreen}
            />
            <Tab.Screen
                name="Home"
                component={HomeStackNavigator}
            />
            <Tab.Screen
                name="Recipe Search"
                component={RecipeSearchScreen}
            />
            <Tab.Screen
                name="Ask AI"
                component={AskAIScreen}
            />
        </Tab.Navigator>
    );
};

const bottomTabsStyles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#90BE6D',
        borderTopWidth: 0,
        height: 90
    },
    tabBarItemStyle: {
        paddingTop: 10,
    },
    headerStyle: {
        backgroundColor: '#90BE6D',
        borderBottomWidth: 0,
        shadowColor: 'transparent',
        shadowOpacity: 0,
        elevation: 0,
    },
    logOutContainerStyle: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    logOutTextStyle: {
        color: 'white',
    }
})


export default BottomTabsNavigator