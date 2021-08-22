import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import WelcomeScreen from './Screens/WelcomeScreen';
import SignInScreen from './Screens/SignInScreen';
import SignUpScreen from './Screens/SignUpScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#38B6FF"
          },
          headerTitleStyle: {
            color: "#fff"
          },
          headerTintColor: "#fff",
          headerShadowVisible: false,
          animation: "slide_from_left"
        }}
      >
        <Stack.Screen component={WelcomeScreen} name="Home" />
        <Stack.Screen component={SignInScreen} name="Sign In" />
        <Stack.Screen component={SignUpScreen} name="Sign Up" />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
});
