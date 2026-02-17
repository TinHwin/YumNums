import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import {
    Settings,
} from 'lucide-react-native';

import { Agenda } from 'react-native-calendars';
import PieChart from 'react-native-pie-chart';

import { useAuthContext } from '../contexts/AuthContext';
import { useUserGoalsAndPreferencesContext } from '../contexts/UserGoalsAndPreferencesContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
    const navigation = useNavigation()
    let SettingsComponent = Settings;

    const { user, loading } = useAuthContext();

    const todayBudgetSeries = [
        { value: 12, color: '#fbd203' },
        { value: 24, color: '#ffb300' },
        { value: 15, color: '#ff9100' },
    ]

    const todayDate = new Date();
    const lastWeekDate = new Date(todayDate);
    lastWeekDate.setDate(todayDate.getDate() - 7);
    const nextWeekDate = new Date(todayDate);
    nextWeekDate.setDate(todayDate.getDate() + 7);

    const formatDate = (date: Date) =>
        date.toISOString().split('T')[0];

    const minDate = formatDate(lastWeekDate);
    const maxDate = formatDate(nextWeekDate);

    const clearEverything = async () => {
        try {
            await AsyncStorage.removeItem('plannedRecipes');
            await AsyncStorage.removeItem('mealPlan');
        } catch (error) {

        }
    };

    return (
        <ScrollView style={homeStyles.screenStyle}>
            <View style={homeStyles.profileContainer}>
                {user?.photoURL && (
                    <Image
                        source={{ uri: user?.photoURL }}
                        style={homeStyles.profileImageStyle}
                    />
                )}
                <View style={homeStyles.profileTextContainerStyle}>
                    <Text
                        style={homeStyles.profileTextStyle}
                    >
                        Welcome back!
                    </Text>
                    <Text
                        style={homeStyles.profileTextStyle}
                    >
                        {user?.displayName}
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Goals & Preferences')}
                        style={homeStyles.profileEditGoalsandPreferencesContainerStyle}
                    >
                        <SettingsComponent size={24} color="white" />
                        <Text
                            style={homeStyles.profileEditGoalsandPreferencesTextStyle}
                        >Edit Goals & Preferences</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={homeStyles.todayBudgetAndCaloriesContainerStyle}>
                <PieChart widthAndHeight={140} series={todayBudgetSeries} />
                <PieChart widthAndHeight={140} series={todayBudgetSeries} />
            </View>
            <TouchableOpacity
                onPress={() => clearEverything()}
            >
                <Text>REMOVE</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const homeStyles = StyleSheet.create({
    screenStyle: {
        flexGrow: 1,
        backgroundColor: 'white',
    },
    profileContainer: {
        flex: 1,
        backgroundColor: '#90BE6D',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        gap: 10,
    },
    profileImageStyle: {
        width: 100,
        height: 100,
        borderRadius: 20,
    },
    profileTextContainerStyle: {
        height: 100,
        gap: 10,
        marginLeft: 10,
    },
    profileTextStyle: {
        textAlign: 'left',
        color: 'black',
        fontSize: 15,
        fontWeight: 700,
    },
    profileEditGoalsandPreferencesContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 10,
    },
    profileEditGoalsandPreferencesTextStyle: {
        color: 'white',
        fontWeight: 500,
    },
    todayBudgetAndCaloriesContainerStyle: {
        flexDirection: 'row'
    }
});

export default HomeScreen;