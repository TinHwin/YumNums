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

import { useAuthContext } from '../contexts/AuthContext';

const HomeScreen = () => {
    const navigation = useNavigation()
    let SettingsComponent = Settings;

    const { user, loading } = useAuthContext();
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
                        { user?.displayName }
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
    }
});

export default HomeScreen;