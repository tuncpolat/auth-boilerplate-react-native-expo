import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import PrivacyPolicy from "../screens/PrivacyPolicy";
import Profile from "../screens/Profile";



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const SettingsNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Settings">
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{
                headerShown: true,
                title: ''
            }} />
            <Stack.Screen name="Profile" component={Profile} options={{
                headerShown: true,
                title: ''
            }} />
        </Stack.Navigator>
    )
}

export default function HomeStack() {
    return (
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Settings" component={SettingsNavigation} />
        </Tab.Navigator>
    );
}