import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchUserScreenController from "./components/search/SearchUserScreenController";
import ChatHomeScreenController from "./components/chat/ChatHomeScreenController";
import colorDefaults from "./theme/colorDefaults";
import DirectMessageScreenController from "./components/chat/DirectMessageScreenController";
import AuthContext from "./context/AuthContext";
import { auth } from "./firebase/firebaseConfig";
import WelcomeScreen from "./components/login/WelcomeScreen";
import SignInScreen from "./components/login/SignInScreen";
import SignUpScreen from "./components/login/SignUpScreen";
import ResetPassword from "./components/login/ResetPassword";
import ChangePasswordScreen from "./components/settings/ChangePasswordScreen";
import StaffProfile from "./components/profile/staff/StaffProfile";
import PatientProfile from "./components/profile/patient/PatientProfile";
import Menu from "./components/mainmenu/Menu";
import ProfileSelection from "./components/profile/ProfileSelection";
import NotificationScreenController from "./components/notifications/NotificationScreenController";
import UploadProfilePicture from "./components/profile/profilecomponents/UploadProfilePicture";
import CommentController from "./components/profile/comments/CommentController";

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
    };

    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 24, textAlign: "center", margin: 8 }}>
          Temporary Home Menu
        </Text>
        <Button
          color={colorDefaults.primary}
          onPress={() => navigation.navigate("Search")}
          title="Search Page"
        />
        <Button
          color={colorDefaults.primary}
          onPress={() => navigation.navigate("ChatHome")}
          title="Message Staff"
        />
        <Button
          color={colorDefaults.primary}
          onPress={() => navigation.navigate("StaffProfile")}
          title="View Staff Profile"
        />
        <Button
          color={colorDefaults.primary}
          onPress={signOut}
          title="Sign Out"
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AuthContext.Provider value={{ authUserId, setAuthUserId }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="WelcomeScreen"
            screenOptions={{
              headerStyle: {
                backgroundColor: colorDefaults.primary,
              },
              headerTitleStyle: {
                color: "#fff",
              },
              headerTintColor: "#fff",
              headerShadowVisible: false,
              animation: "slide_from_left",
            }}
          >
            <Stack.Screen component={WelcomeScreen} name="WelcomeScreen" />
            <Stack.Screen component={SignInScreen} name="Sign In" />
            <Stack.Screen component={SignUpScreen} name="Sign Up" />
            <Stack.Screen component={ResetPassword} name="ResetPassword" />
            <Stack.Screen component={Menu} name="Menu" />
            <Stack.Screen
              component={SearchUserScreenController}
              name="Search"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              component={ChatHomeScreenController}
              name="ChatHome"
            />
            <Stack.Screen
              component={DirectMessageScreenController}
              name="DirectMessage"
            />
            <Stack.Screen component={StaffProfile} name="StaffProfile" />
            <Stack.Screen
              component={ChangePasswordScreen}
              name="ChangePassword"
            />
            <Stack.Screen component={PatientProfile} name="PatientProfile" />
            <Stack.Screen
              component={ProfileSelection}
              name="ProfileSelection"
            />
            <Stack.Screen
              component={NotificationScreenController}
              name="NotificationScreen"
            />
            <Stack.Screen
              component={UploadProfilePicture}
              name="UploadProfilePicture"
            />
            <Stack.Screen
              component={CommentController}
              name="Comment"
            />
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
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
});
