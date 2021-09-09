import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchUserScreenController from './components/search/SearchUserScreenController';
import ChatHomeScreenController from './components/chat/ChatHomeScreenController';
import colorDefaults from './theme/colorDefaults';
import DirectMessageScreenController from './components/chat/DirectMessageScreenController';
import authService from './firebase/authService'
import AuthContext from "./components/AuthContext";
import { auth, storage } from './firebase/firebaseConfig';
import StaffProfile from './components/profile/StaffProfile';
import Menu from './components/mainmenu/Menu';
import * as ImagePicker from 'expo-image-picker';

const Stack = createNativeStackNavigator();

export default function App() {
  // Authentication states
  const [authUserId, setAuthUserId] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [image, setImage] = useState("");

  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const upload = async () => {
    if (image) {
      try {
        const childPath = `profile/${Math.random().toString(36)}`;
        const response = await fetch(image);
        const blob = await response.blob();
        const task = await storage
          .ref()
          .child(childPath)
          .put(blob);

        task.ref.getDownloadURL().then(url => alert(url));
      } catch (error) {
        alert(error.message);
      }
    }
  }

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
            <Button color={colorDefaults.primary} onPress={() => navigation.navigate("StaffProfile")} title="View Staff Profile" />
            <Button color={colorDefaults.primary} onPress={() => navigation.navigate("Menu")} title="Menu" />
            <Button color={colorDefaults.primary} onPress={imagePicker} title="File Picker" />
            <Button color={colorDefaults.primary} onPress={upload} title="Upload Image" />

            {image ? <Image style={{ width: 200, height: 400 }} source={{ uri: image }} /> : <></>}
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

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
                  <Stack.Screen component={SearchUserScreenController} name="Search" options={{ headerShown: false }} />
                  <Stack.Screen component={ChatHomeScreenController} name="ChatHome" />
                  <Stack.Screen component={DirectMessageScreenController} name="DirectMessage" />
                  <Stack.Screen component={StaffProfile} name="StaffProfile" />
                  <Stack.Screen component={Menu} name="Menu" />
                </>
                : <></>
            }
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
