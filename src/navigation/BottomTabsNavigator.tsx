import { View, StyleSheet, TouchableOpacity, Alert, Text, } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from "../screens/HomeScreen";
import MealPlanScreen from "../screens/MealPlanScreen";
import RecipeSearchScreen from "../screens/RecipeSearchScreen";
import ShoppingListScreen from "../screens/ShoppingListScreen";
import UserPreferencesScreen from "../screens/UserGoalsAndPreferencesScreen";
import AskAIScreen from '../screens/AskAIScreen';

import Icon from '../components/icons/Icon';
import { Colors } from '../styles/themes/colors';
import { Spacing } from '../styles/themes/spacing';
import { Radius } from '../styles/themes/radius';

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
import RecipeInstructionsAndNutritionScreen from '../screens/RecipeInstructionsAndNutrition';

const MealPlanStack = createNativeStackNavigator();

function MealPlanStackNavigator() {
    return (
        <MealPlanStack.Navigator
            initialRouteName='Meal Plan'
        >
            <MealPlanStack.Screen
                name='Meal Plan'
                component={MealPlanScreen}
                options={{
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                    headerShadowVisible: false,
                    headerStyle: bottomTabsStyles.headerStyle,
                }}
            />
            <MealPlanStack.Screen
                name='Recipe Instructions & Nutrition'
                component={RecipeInstructionsAndNutritionScreen}
                options={{
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                    headerShadowVisible: false,
                    headerStyle: bottomTabsStyles.headerStyle,
                }}
            />
        </MealPlanStack.Navigator>
    );
};

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
};

const RecipeSearchStack = createNativeStackNavigator();

function RecipeSearchStackNavigator() {
    return (
        <RecipeSearchStack.Navigator
            initialRouteName='Recipe Search'
        >
            <RecipeSearchStack.Screen
                name='Recipe Search'
                component={RecipeSearchScreen}
                options={{
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                    headerShadowVisible: false,
                    headerStyle: bottomTabsStyles.headerStyle,
                }}
            />
            <RecipeSearchStack.Screen
                name='Recipe Instructions & Nutrition'
                component={RecipeInstructionsAndNutritionScreen}
                options={{
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                    headerShadowVisible: false,
                    headerStyle: bottomTabsStyles.headerStyle,
                }}
            />
        </RecipeSearchStack.Navigator>
    );
};

const Tab = createBottomTabNavigator();

function BottomTabsNavigator() {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let IconComponent;

                    switch (route.name) {
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
                component={MealPlanStackNavigator}
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
                component={RecipeSearchStackNavigator}
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
        backgroundColor: Colors.primary,
        borderTopWidth: 0,
        height: 90
    },
    tabBarItemStyle: {
        paddingTop: 10,
    },
    headerStyle: {
        backgroundColor: Colors.primary,
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