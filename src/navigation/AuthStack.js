import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from '../screens/Signup';
import Signin from '../screens/Signin';
import ForgotPassword from "../screens/ForgotPassword";
import PrivacyPolicy from "../screens/PrivacyPolicy";


const Stack = createStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="Signup" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Signin" component={Signin} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{
                headerShown: true,
                title: ''
            }} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{
                headerShown: true,
                title: ''
            }} />
        </Stack.Navigator>
    )
}