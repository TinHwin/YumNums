import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextType, User } from '../types/AuthContextType';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { auth } from '../firebase/firebaseConfig';

import {
    GoogleAuthProvider,
    signInWithCredential,
    onAuthStateChanged,
} from 'firebase/auth';

GoogleSignin.configure({
    webClientId: '994224366854-mp7srt9vj829bbhninfc92c5mei8i2og.apps.googleusercontent.com',
    iosClientId: '994224366854-j6i2jc940repracahjkpn2tf5j48thre.apps.googleusercontent.com',
    offlineAccess: true,
});

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children } : { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const loadStoredUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');

                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error('Failed to load user from AsyncStorage', error);
            }
        };

        loadStoredUser();
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                });
            } else {
                setUser(null);
            }

            setLoading(false);
        })

        return unsubscribe;
    }, []);

    const signInWithGoogle = async () => {
        try {
            setLoading(true);

            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            const googleSigninData = await GoogleSignin.signIn();

            const idToken = googleSigninData.data?.idToken;

            if (!idToken) {
                throw new Error('No idToken found.');
            }

            const credential = GoogleAuthProvider.credential(idToken);

            await signInWithCredential(auth, credential);
            
            const currentUser = auth.currentUser; 

            if (currentUser) {
                await AsyncStorage.setItem('user', JSON.stringify({
                    uid: currentUser.uid,
                    email: currentUser.email,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                }));
            } else {
                await AsyncStorage.removeItem('user');
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const signOut = async () => {
        try {
            await GoogleSignin.signOut();
            await auth.signOut();

            setUser(null);
        } catch (error) {
            console.error('Sign out error: ', error);
        }
    }

    return (
        <AuthContext.Provider
            value={{ user, loading, signInWithGoogle, signOut }}
        >
            { children }
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) throw new Error('useAuthContext must be used inside AuthProvider');

    return context;
}