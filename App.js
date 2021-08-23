import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchUserScreenController from './components/search/SearchUserScreenController';
import ChatHomeScreenController from './components/chat/ChatHomeScreenController';
import colorDefaults from './theme/colorDefaults';
import DirectMessageScreenController from './components/chat/DirectMessageScreenController';
import AuthContext from "./components/AuthContext";
import { auth } from './firebase/firebaseConfig';
import WelcomeScreen from './Screens/WelcomeScreen';
import SignInScreen from './Screens/SignInScreen';
import SignUpScreen from './Screens/SignUpScreen';
import StaffProfile from './components/profile/StaffProfile';

const Stack = createNativeStackNavigator();

export default function App() {
  // Authentication states
  const [authUserId, setAuthUserId] = useState("");

  // Temporary to test navigation
  const Home = ({ navigation }) => {
    const signOut = () => {
      auth
        .signOut()
        .then(() => {
          setAuthUserId(undefined);
          navigation.replace("WelcomeScreen");
        })
        .catch((error) => alert(error));
    }

    return (
      <View style={styles.container} >
        <Text style={{ fontSize: 24, textAlign: "center", margin: 8 }}>Temporary Home Menu</Text>
        <Button color={colorDefaults.primary} onPress={() => navigation.navigate("Search")} title="Search Page" />
        <Button color={colorDefaults.primary} onPress={() => navigation.navigate("ChatHome")} title="Message Staff" />
        <Button color={colorDefaults.primary} onPress={() => navigation.navigate("StaffProfile")} title="View Staff Profile" />
        <Button color={colorDefaults.primary} onPress={signOut} title="Sign Out" />
      </View >
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <AuthContext.Provider value={{ authUserId, setAuthUserId }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="WelcomeScreen"
            screenOptions={{
              headerStyle: {
                backgroundColor: colorDefaults.primary
              },
              headerTitleStyle: {
                color: "#fff"
              },
              headerTintColor: "#fff",
              headerShadowVisible: false,
              animation: "slide_from_left"
            }}
          >
            <Stack.Screen component={WelcomeScreen} name="WelcomeScreen" />
            <Stack.Screen component={SignInScreen} name="Sign In" />
            <Stack.Screen component={SignUpScreen} name="Sign Up" />
            <Stack.Screen component={Home} name="Home" />
            <Stack.Screen component={SearchUserScreenController} name="Search" />
            <Stack.Screen component={ChatHomeScreenController} name="ChatHome" />
            <Stack.Screen component={DirectMessageScreenController} name="DirectMessage" />
            <Stack.Screen component={StaffProfile} name="StaffProfile" />
          </Stack.Navigator>
          <StatusBar style="light" />
        </NavigationContainer>
      </AuthContext.Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorDefaults.backDropColor,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
});
