import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchUserScreenController from './components/search/SearchUserScreenController';
import ChatHomeScreenController from './components/chat/ChatHomeScreenController';
import colorDefaults from './theme/colorDefaults';
import DirectMessageScreenController from './components/chat/DirectMessageScreenController';
import authService from './firebase/authService'
import AuthContext from "./components/AuthContext";
import { auth } from './firebase/firebaseConfig';
import WelcomeScreen from './Screens/WelcomeScreen';
import SignInScreen from './Screens/SignInScreen';
import SignUpScreen from './Screens/SignUpScreen';
import StaffProfile from './components/profile/StaffProfile';
import LoadingScreen from './Screens/LoadingScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  // Authentication states
  const [authUserId, setAuthUserId] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Temporary to test navigation
  const Home = ({ navigation }) => {
    const signOut = () => {
      setLoading(true);
      auth
        .signOut()
        .then(() => { setLoading(false) })
        .catch((error) => alert(error));
    }

    return (
      <View style={styles.container} >
        <Text style={{ fontSize: 24, textAlign: "center", margin: 8 }}>Temporary Home Menu</Text>
        {
          (loggedIn)
            ? <>
              <Button color={colorDefaults.primary} onPress={() => navigation.navigate("Page")} title="Other Page" />
              <Button color={colorDefaults.primary} onPress={() => navigation.navigate("Search")} title="Search Page" />
              <Button color={colorDefaults.primary} onPress={() => navigation.navigate("ChatHome")} title="Message Staff" />
              <Button color={colorDefaults.primary} onPress={() => navigation.navigate("StaffProfile")} title="View Staff Profile" />
              <Button color={colorDefaults.primary} onPress={signOut} title="Sign Out" />
            </>
            : <></>
        }
      </View >
    )
  }

  // Temporary to test navigation
  const Page = () => {
    const signUp = () => {
      authService.signUp("test3@co.nz", "123456", "Luka", "", "Doncic", true)
        .then(msg => console.log(msg));
    }

    return (
      <View style={styles.container}>
        <Text>Another Page.</Text>
        <Button color={colorDefaults.primary} onPress={signUp} title="Sign-up" />
      </View>
    )
  }

  // Watch authentication state: check if a user is already signed in.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUserId(user.uid);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }

      setLoading(false);
    })

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <AuthContext.Provider value={authUserId}>
        {
          (loading) // Show loading screen while authentication is checking
            ? <LoadingScreen />
            // Show react navigation once authentication service is done checking.
            : <NavigationContainer>
              <Stack.Navigator
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
                {
                  (loggedIn) // Check if a user is already signed in.
                    // Don't show login screen if user already signed in.
                    ? <>
                      <Stack.Screen component={Home} name="Home" />
                      <Stack.Screen component={Page} name="Page" />
                      <Stack.Screen component={SearchUserScreenController} name="Search" />
                      <Stack.Screen component={ChatHomeScreenController} name="ChatHome" />
                      <Stack.Screen component={DirectMessageScreenController} name="DirectMessage" />
                      <Stack.Screen component={StaffProfile} name="StaffProfile" />
                    </>
                    // Only show login screen if user not yet signed in.
                    : <>
                      <Stack.Screen component={WelcomeScreen} name="WelcomeScreen" />
                      <Stack.Screen component={SignInScreen} name="Sign In" />
                      <Stack.Screen component={SignUpScreen} name="Sign Up" />
                    </>
                }
              </Stack.Navigator>
              <StatusBar style="light" />
            </NavigationContainer>
        }
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
