import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchUserScreenController from './components/search/SearchUserScreenController';
import ChatHomeScreenController from './components/chat/ChatHomeScreenController';
import colorDefaults from './theme/colorDefaults';
import DirectMessageScreenController from './components/chat/DirectMessageScreenController';
import authService from './firebase/authService'
import AuthContext from "./components/AuthContext";
import { auth } from './firebase/firebaseConfig';

const Stack = createNativeStackNavigator();

export default function App() {
  // Authentication states
  const [authUserId, setAuthUserId] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  // Temporary to test navigation
  const Home = ({ navigation }) => (
    <View style={styles.container} >
      <Text style={{ fontSize: 24, textAlign: "center", margin: 8 }}>Temporary Home Menu</Text>
      {
        (loggedIn)
          ? <>
            <Button color={colorDefaults.primary} onPress={() => navigation.navigate("Page")} title="Other Page" />
            <Button color={colorDefaults.primary} onPress={() => navigation.navigate("Search")} title="Search Page" />
            <Button color={colorDefaults.primary} onPress={() => navigation.navigate("ChatHome")} title="Message Staff" />
          </>
          : <></>
      }
    </View >
  )

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

  // Test sign in method.
  useEffect(() => {
    authService.signIn("test1@co.nz", "123456")
      .then(user => console.log("Logged in user id: " + user.uid));
  }, []);

  // Watch authentication state: check if a user is already signed in.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUserId(user.uid);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    })

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={authUserId}>
      <NavigationContainer>
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
          <Stack.Screen component={Home} name="Home" />
          {
            (loggedIn)
              ? <>
                <Stack.Screen component={Page} name="Page" />
                <Stack.Screen component={SearchUserScreenController} name="Search" />
                <Stack.Screen component={ChatHomeScreenController} name="ChatHome" />
                <Stack.Screen component={DirectMessageScreenController} name="DirectMessage" />
              </>
              : <></>
          }
        </Stack.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    </AuthContext.Provider>

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
