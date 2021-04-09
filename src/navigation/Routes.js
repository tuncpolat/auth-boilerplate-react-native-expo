import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import HomeNavigator from './HomeNavigator';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font'
import { Context as AuthContext } from '../context/AuthContext'
import { StyleSheet, SafeAreaView } from "react-native";
import Loading from '../components/Loading';

export default function Routes() {
    const { state: { authenticated }, checkIfAuthenticated } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkIfAuthenticated(() => {
            setLoading(false)
        })
    }, []);


    const loadFonts = () => {
        return Font.loadAsync({
            'montserrat-bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
            'montserrat-semibold': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
            'montserrat': require('../../assets/fonts/Montserrat.ttf'),
        })
    }

    const [fontsLoaded, setFontsLoded] = useState(false)

    if (!fontsLoaded) {
        return <AppLoading startAsync={loadFonts} onError={console.warn} onFinish={() => setFontsLoded(true)} />
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <NavigationContainer>
            <SafeAreaView style={styles.droidSafeArea}>
                {authenticated ? <HomeNavigator /> : <AuthStack />}
            </SafeAreaView>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
    },
});