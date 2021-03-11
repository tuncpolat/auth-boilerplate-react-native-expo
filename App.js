import React, { useState, useContext, useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as Font from 'expo-font'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


// context
import { Provider as AuthProvider, Context as AuthContext } from './src/context/AuthContext'

// screens
import SignupScreen from './src/screens/onboarding/Signup';
import SigninScreen from './src/screens/onboarding/Signin';
import ForgotPassword from "./src/screens/onboarding/ForgotPassword";

import HomeScreen from "./src/screens/Home";
import SettingsScreen from "./src/screens/Settings";

// styles
import { default as theme } from "./src/style/custom-theme.json"; // <-- Import app theme
import { default as mapping } from './src/style/mapping.json'; // <-- Import app mapping (for fonts)




// create stack & tab navigator
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const RootNavigation = () => {
  const { state: { authenticated }, checkIfAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    checkIfAuthenticated()   
  }, [])

  const loadFonts = () => {
    return Font.loadAsync({
      'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
      'montserrat-semibold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
      'montserrat': require('./assets/fonts/Montserrat.ttf'),
    })
  }

  const [fontsLoaded, setFontsLoded] = useState(false)

  if (!fontsLoaded) {
    return <AppLoading startAsync={loadFonts} onError={console.warn} onFinish={() => setFontsLoded(true)} />
  }

  return (
    <NavigationContainer>
      {
        !authenticated ?
          <Stack.Navigator initialRouteName="Signup" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Signin" component={SigninScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          </Stack.Navigator> :
          <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
      }
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.light, ...theme }}
        customMapping={mapping}
      >
        <AuthProvider>
          <RootNavigation />
        </AuthProvider>
      </ApplicationProvider>
    </>
  );
}